import { API_URL } from "@/constants"
import { IUser } from "@/types/user"

const whoami = async (): Promise<IUser | Error> => {
  const res = await fetch(`${API_URL}/users/whoami`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!res.ok) {
    const refreshRes = await refresh()

    if (refreshRes instanceof Error) return new Error("Failed to fetch data")
    else await whoami()
  }

  return res.json()
}

const refresh = async (): Promise<boolean | Error> => {
  const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!refreshRes.ok) return new Error("Failed to fetch data")

  return true
}

export { whoami }
