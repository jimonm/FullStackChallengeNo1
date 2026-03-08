const API = import.meta.env.VITE_API_URL

function authHeader() {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`
  }
}

export async function fetchDocuments() {

  const res = await fetch(`${API}/documents`, {
    headers: authHeader()
  })

  return res.json()
}

export async function uploadDocument(formData: FormData) {

  const res = await fetch(`${API}/documents/upload`, {
    method: "POST",
    headers: authHeader(),
    body: formData
  })

  return res.json()
}

export async function fetchResult(id: string) {

  const res = await fetch(`${API}/documents/${id}/result`, {
    headers: authHeader()
  })

  return res.json()
}