"use client"

import { login, register } from "@/api"
import { UserContext } from "@core/providers/ClientProvider"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const LoginWrapper = () => {
  const { push } = useRouter()

  const { fetchData, logged } = useContext(UserContext)

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const [formType, setFormType] = useState(true)

  useEffect(() => {
    if (logged) push("/")
  }, [logged])

  const loginUser = () =>
    login(userName, password).then(() => {
      push("/")
      fetchData()
    })
  const registerUser = () =>
    register(userName, password).then(() => {
      push("/")
      fetchData()
    })

  return (
    <div>
      <button onClick={() => setFormType((prevState) => !prevState)}>
        change Form
      </button>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formType ? (
          <button onClick={loginUser}>login</button>
        ) : (
          <button onClick={registerUser}>register</button>
        )}
      </div>
    </div>
  )
}

export { LoginWrapper }
