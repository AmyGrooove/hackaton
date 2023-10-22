import { API_URL } from "@/constants"

const uploadUrl = async (
  name: string,
  url: string,
): Promise<string | Error> => {
  const res = await fetch(`${API_URL}/chart/uploadUrl`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, url }),
    credentials: "include",
  })

  return res.ok ? res.text() : new Error("Failed to fetch data")
}

export { uploadUrl }
