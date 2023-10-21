import { API_URL } from "@/constants"

const logout = async (): Promise<boolean | Error> => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  return res.ok ? true : new Error("Failed to fetch data")
}

export { logout }
