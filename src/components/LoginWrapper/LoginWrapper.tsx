"use client"

import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

import { login, register } from "@/api"
import { UserContext } from "@/core/providers/ClientProvider"

import st from "./LoginWrapper.module.scss"

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
    <div className={st.root}>
      <div className={st.modal}>
        <h1 className={st.header}>
          {formType ? "Авторизация" : "Регистрация"}
        </h1>
        <input
          className={st.input}
          placeholder="Логин"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className={st.input}
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={st.button}
          onClick={formType ? loginUser : registerUser}
        >
          {formType ? "Авторизоваться" : "Зарегистрироваться"}
        </button>
        <div className={st.changeType}>
          <div className={st.changeTypeLabel}>
            {formType ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          </div>
          <div
            className={st.changeTypeButton}
            onClick={() => setFormType((prevState) => !prevState)}
          >
            {formType ? "Зарегистрироваться" : "Авторизоваться"}
          </div>
        </div>
      </div>
    </div>
  )
}

export { LoginWrapper }
