import DocumentCard from "./DocumentCard"

type Props = {
  documents: any[]
  reload: () => Promise<void>
}

export default function DocumentGrid({ documents, reload }: Props) {

  function getDoc(type: string) {
    return documents.find((d: any) => d.type === type)
  }

  return (

    <div>

      <h2>Required Documents</h2>

      <p style={{ color: "#6e6f7b", marginBottom: 10 }}>
        Please upload all required documents to complete your onboarding
      </p>

      <DocumentCard
        title="Resume"
        type="resume"
        document={getDoc("resume")}
        reload={reload}
        description="Upload your latest resume"
      />

      <DocumentCard
        title="Australian Driver Licence"
        type="driver_license"
        document={getDoc("driver_license")}
        reload={reload}
        description="Driver licence identification"
      />

      <DocumentCard
        title="Australian Passport"
        type="passport"
        document={getDoc("passport")}
        reload={reload}
        description="Valid Australian passport"
      />

    </div>

  )
}