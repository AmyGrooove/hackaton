import { API_URL } from "@/constants"

const register = async (
  userName: string,
  password: string,
): Promise<boolean | Error> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      password,
    }),
    credentials: "include",
  })

  return res.ok ? true : new Error("Failed to fetch data")
}

export { register }
