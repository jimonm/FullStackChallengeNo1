import prisma from "../config/db"
import { classifyDocument } from "../services/truuthService"
import { validateClassification } from "../utils/validateClassification"

export const uploadDocument = async (req:any,res:any)=>{

  try{

    const userId = req.user.userId
    const file = req.file
    const type = req.body.type
    const label = req.body.label || null

    if(!file){
      return res.status(400).json({message:"No file uploaded"})
    }

    let status = "UNVERIFIED"
    let documentVerifyId = null

    /*
    ==========================
    ONLY PASSPORT + LICENCE
    ==========================
    */

    if(type === "passport" || type === "driver_license"){

      const mimeType = file.mimetype

      const classification = await classifyDocument(file.path,mimeType)

      const valid = validateClassification(type,classification)

      if(!valid){
        return res.status(400).json({
          message:"Uploaded document is not a valid "+type
        })
      }

      /*
      ==========================
      VERIFY API (DISABLED)
      ==========================
      */

      // Instead of calling Truuth Verify API
      // we just mark document as IN_PROGRESS

      status = "IN_PROGRESS"
      documentVerifyId = null
    }

    /*
    ==========================
    RESUME + ADDITIONAL
    ==========================
    */

    // they stay UNVERIFIED
    // no Truuth APIs called

    const requiredTypes = ["resume","driver_license","passport"]

    let document

    if(requiredTypes.includes(type)){

      const existing = await prisma.document.findFirst({
        where:{
          userId,
          type
        }
      })

      if(existing){

        document = await prisma.document.update({
          where:{ id: existing.id },
          data:{
            fileUrl:file.path,
            status,
            documentVerifyId
          }
        })

      }else{

        document = await prisma.document.create({
          data:{
            type,
            label,
            fileUrl:file.path,
            status,
            documentVerifyId,
            user:{
              connect:{ id:userId }
            }
          }
        })

      }

    }

    else{

      document = await prisma.document.create({
        data:{
          type,
          label,
          fileUrl:file.path,
          status,
          documentVerifyId,
          user:{
            connect:{ id:userId }
          }
        }
      })

    }

    res.json({
      message:"Document uploaded",
      document
    })

  }

  catch(error){

    console.error(error)

    res.status(500).json({
      message:"Upload failed"
    })

  }

}



export const getDocuments = async (req:any,res:any)=>{

  try{

    const userId = req.user.userId

    const documents = await prisma.document.findMany({
      where:{ userId },
      orderBy:{
        createdAt:"desc"
      }
    })

    res.json(documents)

  }
  catch(error){

    console.error(error)

    res.status(500).json({
      message:"Failed to fetch documents"
    })

  }

}



export const getDocumentResult = async (req:any,res:any)=>{

  try{

    const id = req.params.id

    const document = await prisma.document.findUnique({
      where:{ id }
    })

    if(!document){
      return res.status(404).json({
        message:"Document not found"
      })
    }

    res.json({
      status: document.status,
      result: document.verificationResult
    })

  }
  catch(error){

    console.error(error)

    res.status(500).json({
      message:"Failed to fetch result"
    })

  }

}