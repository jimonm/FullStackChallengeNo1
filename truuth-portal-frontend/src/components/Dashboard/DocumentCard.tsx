import { FiUpload, FiRotateCcw } from "react-icons/fi"
import { useState } from "react"
import "./document.css"
import { uploadDocument } from "../../api/api"
import ResultModal from "../Result/ResultModal"

type Props = {
  title: string
  description: string
  type: string
  document?: any
  reload: () => Promise<void>
}

export default function DocumentCard({
  title,
  description,
  type,
  document: doc,
  reload
}: Props) {

  const uploaded = !!doc
  const status = doc?.status || "UNVERIFIED"
  const [uploading, setUploading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const fileName = doc?.fileUrl
    ?.split(/[\\/]/)
    .pop()
    ?.split("-")
    .slice(1)
    .join("-")

  async function handleUpload() {

    const input = window.document.createElement("input")
    input.type = "file"

    input.onchange = async (e: any) => {

      const file = e.target.files[0]
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      

        try {
          setUploading(true)
          await uploadDocument(formData)
          await reload()

        } catch (err: any) {

            const message =
              err?.response?.data?.message || "Upload failed"

            alert(message)

          }finally {

          setUploading(false)

        }

    }

    input.click()
  }

  return (

    <div className={`doc-card ${uploaded ? "uploaded" : ""}`}>

      <div className="doc-left">

        <div className="doc-icon">📄</div>

        <div>

          <h4>{title}</h4>

          {uploaded ? (

            <div className="uploaded-info">

              <span className="tag uploaded">
                Uploaded
              </span>

              <div style={{ fontSize: 14, marginTop: 5 }}>
                {fileName}
              </div>

              <p>
                Uploaded {new Date(doc.createdAt).toLocaleString()}
              </p>

              {type !== "resume" && (

                <div style={{ marginTop: 6 }}>

                  {status === "PROCESSING" && (
                    <span className="tag pending">
                      Processing verification...
                    </span>
                  )}

                  {status === "DONE" && (
                    <>
                      <span className="tag verified">
                        Verified
                      </span>

                      <button
                        style={{ marginLeft: 10 }}
                        className="outline-btn"
                        onClick={() => setShowResult(true)}
                      >
                        View Result
                      </button>
                    </>
                  )}

                  {status === "FAILED" && (
                    <span className="tag failed">
                      Verification failed
                    </span>
                  )}

                </div>

              )}

            </div>

          ) : (

            <div className="tag gray">
              Not uploaded
            </div>

          )}

          <p>{description}</p>

        </div>

      </div>

      <button
        className="primary-btn"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? (
            <>
              <FiUpload />
              Uploading...
            </>
          ) : uploaded ? (
            <>
              <FiRotateCcw />
              Upload again
            </>
          ) : (
            <>
              <FiUpload />
              Upload
            </>
          )}
      </button>

      {showResult && (
        <ResultModal
          id={doc.id}
          close={() => setShowResult(false)}
        />
      )}

    </div>

  )
}