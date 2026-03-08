// import axios from "axios"
// import fs from "fs"
// import FormData from "form-data"
// import aws4 from "aws4"

// import { fileToBase64 } from "../utils/fileToBase64"
// import { getTruuthAuthHeader } from "../utils/truuthAuth"


// /*
// ========================
// CLASSIFIER API
// ========================
// */

// export async function classifyDocument(
//   filePath: string,
//   mimeType: string
// ) {

//   const base64 = fileToBase64(filePath)

//   const response = await axios.post(

//     process.env.TRUUTH_CLASSIFIER_URL!,

//     {
//       images: [
//         {
//           image: base64,
//           mimeType
//         }
//       ]
//     },

//     {
//       headers: {
//         Authorization: getTruuthAuthHeader(),
//         "Content-Type": "application/json"
//       }
//     }

//   )

//   return response.data
// }



// /*
// ========================
// VERIFY API
// ========================
// AWS SIGNATURE V4
// */

// export async function submitVerification(filePath: string) {

//   const form = new FormData()

//   form.append("documentImage", fs.createReadStream(filePath))

//   const opts: any = {
//     host: "submissions.api.au.truuth.id",
//     path: "/verify/document-fraud-check",
//     service: "execute-api",
//     region: "ap-southeast-2",
//     method: "POST",
//     headers: {
//       ...form.getHeaders()
//     }
//   }

//   aws4.sign(opts, {
//     accessKeyId: process.env.TRUUTH_API_KEY!,
//     secretAccessKey: process.env.TRUUTH_API_SECRET!
//   })

//   const response = await axios({
//   method: "POST",
//   url: "https://submissions.api.au.truuth.id/verify/document-fraud-check",
//   headers: opts.headers,
//   data: form
// })

//   return response.data
// }

import axios from "axios"
import { getTruuthAuthHeader } from "../utils/truuthAuth"

/*
CLASSIFIER API
*/

export async function classifyDocument(
  fileBuffer: Buffer,
  mimeType: string
) {

  const base64 = fileBuffer.toString("base64")

  const response = await axios.post(
    process.env.TRUUTH_CLASSIFIER_URL!,
    {
      images: [
        {
          image: base64,
          mimeType
        }
      ]
    },
    {
      headers: {
        Authorization: getTruuthAuthHeader(),
        "Content-Type": "application/json"
      }
    }
  )

  return response.data
}


/*
VERIFY API (skipped for now)
*/

export async function submitVerification(fileBuffer: Buffer) {

  return {
    status: "IN_PROGRESS",
    message: "Verification started"
  }

}