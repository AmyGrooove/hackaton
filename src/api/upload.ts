import { API_URL } from "@/constants"

const upload = async (
  file: File,
  fileName: string,
): Promise<boolean | Error> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("fileName", fileName)

  const res = await fetch(`${API_URL}/chart/upload`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: formData,
    credentials: "include",
  })

  return res.ok ? true : new Error("Failed to fetch data")
}

export { upload }
