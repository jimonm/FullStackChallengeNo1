import { useEffect, useState } from "react"
import Header from "../Layout/Header"
import ProgressBar from "./ProgressBar"
import DocumentGrid from "./DocumentGrid"
import { fetchDocuments, uploadDocument } from "../../api/api"

export default function Dashboard() {

  const [documents, setDocuments] = useState<any[]>([])
  const [additionalType, setAdditionalType] = useState("")
  const [otherLabel, setOtherLabel] = useState("")

  useEffect(() => {
  loadDocuments()
  const interval = setInterval(() => {
    const processing = documents.some(
      (d) => d.status === "PROCESSING"
    )
    if (processing) {
      loadDocuments()
    }
  }, 5000)
  return () => clearInterval(interval)
}, [])

  async function loadDocuments() {
    const docs = await fetchDocuments()
    setDocuments(docs)
  }

  async function handleAdditionalUpload(){

  if(!additionalType){
    alert("Please select document type")
    return
  }

  if(additionalType === "Other" && !otherLabel.trim()){
    alert("Please specify the document name")
    return
  }

  const input = window.document.createElement("input")
  input.type="file"

  input.onchange = async (e:any)=>{

    const file = e.target.files[0]
    if(!file) return

    const formData = new FormData()

    formData.append("file", file)
    formData.append("type", "additional")

    const label =
      additionalType === "Other"
      ? `Other (${otherLabel})`
      : additionalType

    formData.append("label", label)

    try{

      await uploadDocument(formData)

      setAdditionalType("")
      setOtherLabel("")

      await loadDocuments()

    }catch{
      alert("Upload failed")
    }

  }

  input.click()

}

  const resume = documents.find(d => d.type === "resume")
  const licence = documents.find(d => d.type === "driver_license")
  const passport = documents.find(d => d.type === "passport")

  const requiredTypes = [
    "passport",
    "driver_license",
    "resume"
  ]

  const uploadedRequired = documents.filter(
    (d) => requiredTypes.includes(d.type)
  ).length

  const resumeUploaded = !!resume
  const licenceUploaded = !!licence
  const passportUploaded = !!passport

  const licenceVerified = licence?.status === "DONE"
  const passportVerified = passport?.status === "DONE"

  const canConfirm =
    resumeUploaded &&
    licenceVerified &&
    passportVerified

  let tooltipMessage = ""

  if (!resumeUploaded || !licenceUploaded || !passportUploaded) {
    tooltipMessage = "Upload all required documents"
  }
  else if (!licenceVerified && !passportVerified) {
    tooltipMessage = "Verify your Driver Licence and Passport"
  }
  else if (!licenceVerified) {
    tooltipMessage = "Verify your Driver Licence"
  }
  else if (!passportVerified) {
    tooltipMessage = "Verify your Passport"
  }

  return (

    <div>

      <Header />

      <div className="container" style={{ marginTop: "40px" }}>

        <ProgressBar
          uploaded={uploadedRequired}
          total={3}
        />

        <DocumentGrid
          documents={documents}
          reload={loadDocuments}
        />

        <div style={{ marginTop: 40 }}>

          <h2>Additional Documents</h2>

          <p style={{ color: "#6e6f7b", marginBottom: 15 }}>
            If you have been asked to provide additional documents, you can upload them here.
          </p>

          {/* Upload UI */}

          <div className="additional-upload">

            <div className="doc-icon">📄</div>

            <select
              value={additionalType}
              onChange={(e)=>setAdditionalType(e.target.value)}
            >
              <option value="">Select document type</option>
              <option value="Bank Statement">Bank Statement</option>
              <option value="Tax Document">Tax Document</option>
              <option value="Employment Letter">Employment Letter</option>
              <option value="Other">Other</option>
            </select>

            {additionalType === "Other" && (

              <input
                type="text"
                placeholder="Specify document name"
                value={otherLabel}
                onChange={(e)=>setOtherLabel(e.target.value)}
                className="other-input"
              />

            )}

            <button
              className="primary-btn"
              disabled={!additionalType || (additionalType==="Other" && !otherLabel)}
              onClick={handleAdditionalUpload}
              style={{
                opacity: (!additionalType || (additionalType==="Other" && !otherLabel)) ? 0.4 : 1,
                cursor: (!additionalType || (additionalType==="Other" && !otherLabel)) ? "not-allowed" : "pointer"
              }}
            >
              Upload
            </button>

          </div>

          {/* Uploaded additional docs */}

          {documents
            .filter(d =>
              !requiredTypes.includes(d.type)
            )
            .map(doc => {

              const name = doc.fileUrl
                ?.split(/[\\/]/)
                .pop()
                ?.split("-")
                .slice(1)
                .join("-")

              return (

                <div
                  key={doc.id}
                  className="doc-card uploaded"
                  style={{ marginTop: 20 }}
                >

                  <div className="doc-left">

                    <div className="doc-icon">📄</div>

                    <div>

                     <h4>Additional Document — {doc.label || "Other"}</h4>

                      <span className="tag uploaded">
                        Uploaded
                      </span>

                      <div style={{ fontSize: 14, marginTop: 5 }}>
                        {name}
                      </div>

                      <p>
                        Uploaded {new Date(doc.createdAt).toLocaleString()}
                      </p>

                    </div>

                  </div>

                </div>

              )

            })}

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 40,
            marginBottom: 80
          }}
        >

          <button
            className="primary-btn"
            disabled={!canConfirm}
            title={!canConfirm ? tooltipMessage : ""}
            style={{
              opacity: canConfirm ? 1 : 0.5,
              cursor: canConfirm ? "pointer" : "not-allowed"
            }}
          >
            ✓ Confirm
          </button>

        </div>

      </div>

    </div>

  )

}