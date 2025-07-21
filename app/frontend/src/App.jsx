import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [query, setQuery] = useState("")
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("query", query)

    const res = await fetch("http://localhost:8000/query", {
      method: "POST",
      body: form,
    })

    const data = await res.json()
    setResult(data)
  }

  return (
      <>
          <div>
              <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo"/>
              </a>
              <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
          </div>
          <h1 className="text-3xl font-bold underline">
              Vite + React + tailwindcss!
          </h1>
          <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
              </button>
              <p>
                  Edit <code>src/App.jsx</code> and save to test HMR
              </p>
          </div>
          <p className="read-the-docs">
              Click on the Vite and React logos to learn more
          </p>
          <br />
          <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Cypher Query Tool</h1>
            <form onSubmit={handleSubmit}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="MATCH (n) RETURN n LIMIT 10"
                rows="5"
                className="w-full p-3 border rounded mb-4"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Ausführen
              </button>
            </form>
            {result && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Ergebnis:</h2>
                <pre className="mt-4 p-3 bg-gray-100 text-black text-sm rounded-lg overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
      </>
  )
}

export default App
