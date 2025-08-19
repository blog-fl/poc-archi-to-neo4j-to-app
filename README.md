# poc-archi-to-neo4j-to-app
This system architecture, implemented as a proof of concept, integrates a modern frontend built with React, Vite, and Tailwind CSS, a high-performance backend using Python and FastAPI, and a Neo4j graph database for complex data relationships. Archimate models serve as the primary data source, with arch models exported to the Neo4j database. After the import of Archimate models to the Neo4j database, users are able to ask questions about the model through natural language, facilitated by an AI agent that translates text input into Cypher queries and the response back to natural language.

```mermaid
graph TD
    subgraph Frontend
        A[React + Vite]
        A1[The frontend application is built with React and Vite. Vite is a modern build tool that accelerates development.]
    end

    subgraph Backend
        B[Python with FastAPI]
        B1[The backend is built with Python and FastAPI. FastAPI is a modern web framework for Python that offers high performance and easy API creation.]
    end

    subgraph Requirement Management
        RFP[List of Requirements]
        B1[...]
    end

    subgraph Database
        C[Neo4j as GraphDB]
        C1[The database is a graph database that can be used both online and offline. Neo4j is a powerful graph database optimized for complex relationships and queries.]
    end

    subgraph Local LLM
        D[Local LLM]
        D1[A local Large Language Model used for specific tasks. This could be utilized for natural language processing or other machine learning tasks.]
    end

    subgraph AI Agent
        F[AI Agent]
        F1[An AI agent that translates text input to Cypher and calls the Neo4j database.]
    end

    subgraph Styling
        E[Tailwind CSS]
        E1[Tailwind CSS is used for styling the frontend application. It is a utility-first CSS framework that makes it easy to create consistent and responsive designs.]
    end



    A --> B
    B --> F
    A --> E
    F --> C
    F --> D
    B --> RFP

    style A fill:#555,stroke:#333,stroke-width:2px
    style B fill:#555,stroke:#333,stroke-width:2px
    style C fill:#555,stroke:#333,stroke-width:2px
    style D fill:#555,stroke-width:2px
    style E fill:#555,stroke:#333,stroke-width:2px
    style F fill:#555,stroke:#333,stroke-width:2px
    style RFP fill:#555,stroke:#333,stroke-width:2px

```

TODOs:
- https://neo4j.com/blog/genai/what-is-graphrag/
