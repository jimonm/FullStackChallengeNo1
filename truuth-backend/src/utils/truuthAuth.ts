export function getTruuthAuthHeader() {

  const username = process.env.TRUUTH_API_KEY
  const password = process.env.TRUUTH_API_SECRET

  const token = Buffer
    .from(`${username}:${password}`)
    .toString("base64")

  return `Basic ${token}`

}