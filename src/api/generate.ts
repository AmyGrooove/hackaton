import { API_URL } from "@/constants"

const generate = async (name: string, count = 5): Promise<boolean | Error> => {
  const res = await fetch(`${API_URL}/chart/generate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, count }),
    credentials: "include",
  })

  return res.ok ? true : new Error("Failed to fetch data")
}

export { generate }
