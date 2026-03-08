import { useEffect, useState } from "react"
import { fetchResult } from "../../api/api"

export default function ResultModal({ id, close }: any) {

  const [result, setResult] = useState<any>(null)

  useEffect(() => {

    async function load() {

      const r = await fetchResult(id)
      setResult(r)

    }

    load()

  }, [])

  return (

    <div className="modal-overlay">

      <div className="modal-card">

        <h3>Verification Result</h3>

        {!result && <p>Loading...</p>}

        {result && (

          <pre className="result-json">
            {JSON.stringify(result, null, 2)}
          </pre>

        )}

        <div className="modal-actions">

          <button
            className="outline-btn"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result))}
          >
            Copy JSON
          </button>

          <button
            className="primary-btn"
            onClick={close}
          >
            Close
          </button>

        </div>

      </div>

    </div>

  )
}