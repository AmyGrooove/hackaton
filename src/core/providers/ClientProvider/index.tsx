"use client"

import { logout, whoami } from "@/api"
import { IUser } from "@/types/user"
import { useRouter } from "next/navigation"
import { ReactElement, createContext, useEffect, useState } from "react"

interface IProviders {
  children: ReactElement
}

interface IUserContext {
  data: IUser
  logged: boolean
  fetchData: () => void
}

const DEFAULT_VALUES = {
  data: {
    _id: "",
    username: "",
    role: "user",
    image: null,
    accessCharts: [],
  },
  logged: false,
  fetchData: () => {},
}

const UserContext = createContext<IUserContext>(DEFAULT_VALUES)

const ClientProvider = ({ children }: IProviders) => {
  const { push } = useRouter()

  const [contextData, setContextData] = useState<IUserContext>(DEFAULT_VALUES)

  const fetchData = async () => {
    const result = await whoami()

    if (result instanceof Error) {
      setContextData(DEFAULT_VALUES)
      push("/login")
      return
    } else
      setContextData((prevState) => ({
        ...prevState,
        data: result,
        logged: true,
      }))
  }

  useEffect(() => {
    fetchData()

    const intervalId = setInterval(fetchData, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const logoutUser = () =>
    logout().then(() => {
      fetchData()
      push("/login")
    })

  return (
    <UserContext.Provider value={{ ...contextData, fetchData }}>
      <div>
        {contextData.logged ? (
          <button onClick={() => logoutUser()}>logout</button>
        ) : (
          <button onClick={() => push("/login")}>login</button>
        )}
      </div>
      {children}
    </UserContext.Provider>
  )
}

export { ClientProvider, UserContext }
