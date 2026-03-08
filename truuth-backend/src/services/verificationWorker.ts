import prisma from "../config/db"
import axios from "axios"
import aws4 from "aws4"

async function checkVerificationResult(document: any) {

  const opts: any = {
    host: "portal.api.us.truuth.id",
    path: `/verify/document-fraud-check/${document.documentVerifyId}`,
    service: "execute-api",
    region: "ap-southeast-2",
    method: "GET"
  }

  aws4.sign(opts, {
    accessKeyId: process.env.TRUUTH_API_KEY!,
    secretAccessKey: process.env.TRUUTH_API_SECRET!
  })

  const response = await axios({
    method: "GET",
    url: `https://${opts.host}${opts.path}`,
    headers: opts.headers
  })

  return response.data
}


export async function startVerificationWorker() {

  setInterval(async () => {

    const documents = await prisma.document.findMany({
      where: {
        status: "PROCESSING"
      }
    })

    for (const doc of documents) {

      try {

        const result = await checkVerificationResult(doc)

        if (result.status === "DONE" || result.status === "FAILED") {

          await prisma.document.update({
            where: { id: doc.id },
            data: {
              status: result.status,
              verificationResult: result
            }
          })

        }

      } catch (err) {

        console.log("Polling error:", err)

      }

    }

  }, 5000)

}