import os
from dotenv import load_dotenv, find_dotenv

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Query
from neo4j import GraphDatabase
app = FastAPI()

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# retrieve env variables from in env-file

def load_env():
    _ = load_dotenv(find_dotenv())

load_env()
print(os.getenv("neo4j-db-uri"))

# Neo4j Setup
driver = GraphDatabase.driver(
    os.getenv("neo4j-db-uri"),
    auth=(os.getenv("neo4j-db-user"), os.getenv("neo4j-db-password"))
)

def run_cypher_query(query: str):
    with driver.session() as session:
        result = session.run(query)
        return [dict(record) for record in result]

@app.get("/node_classes")
def get_classes():
    try:
        data = run_cypher_query("""
        MATCH (n) RETURN DISTINCT n.class
        """)
        return {"success": True, "data": data}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/nodes")
def query_cypher(node_class: str = Query(..., min_length=1)):
    if not node_class.isidentifier() or node_class == "":
        return {"error": "Invalid label name"}
    try:
        data = run_cypher_query(f"""
        MATCH (n {{class: "{node_class}"}}) 
        RETURN n
        """)
        return {"success": True, "data": data}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/query")
def query_cypher(query: str = Form(...)):
    try:
        data = run_cypher_query(query)
        return {"success": True, "data": data}
    except Exception as e:
        return {"success": False, "error": str(e)}