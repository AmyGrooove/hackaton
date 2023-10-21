import { API_URL } from "@/constants"

const login = async (
  userName: string,
  password: string,
): Promise<boolean | Error> => {
  const res = await fetch(`${API_URL}/auth/login`, {
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

export { login }
