import fs from "fs"

export function fileToBase64(filePath:string){
  const file = fs.readFileSync(filePath)
  return file.toString("base64")
}