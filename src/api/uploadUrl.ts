import { API_URL } from "@/constants"

const uploadUrl = async (
  name: string,
  url: string,
): Promise<boolean | Error> => {
  const res = await fetch(`${API_URL}/chart/upload`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, url }),
    credentials: "include",
  })

  return res.ok ? true : new Error("Failed to fetch data")
}

export { uploadUrl }
