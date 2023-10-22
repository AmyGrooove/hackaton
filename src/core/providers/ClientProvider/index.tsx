"use client"

import { usePathname, useRouter } from "next/navigation"
import { ReactElement, createContext, useEffect, useState } from "react"
import Link from "next/link"

import { logout, whoami } from "@/api"
import { IUser } from "@/types/user"
import { cl } from "@/utils"

import st from "./index.module.scss"
import { UploadIcon } from "./UploadIcon"
import { ChartIcon } from "./ChartIcon"
import { ChevronsIcon } from "./ChevronsIcon"

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
  const pathname = usePathname()

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

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
      <div className={cl(st.root, !contextData.logged && st.root_disabled)}>
        <div className={st.leftSide}>
          <button
            onClick={() => setIsSideBarOpen((prevState) => !prevState)}
            className={st.sideBarButton}
          >
            <ChevronsIcon />
          </button>
          <div className={st.dashName}>
            {pathname === "/"
              ? "Главная страница"
              : contextData.data.accessCharts?.find(
                  (el) => el.id === pathname?.replace("/dashboard/", ""),
                )?.name}
          </div>
        </div>
        <div className={st.leftSide}>
          <button onClick={() => push("/")} className={st.button}>
            Создать
          </button>
          <button onClick={() => logoutUser()} className={st.logout}>
            <UploadIcon />
          </button>
        </div>
      </div>
      <div className={cl(st.sideBar, isSideBarOpen && st.sideBar_open)}>
        {contextData.data.accessCharts?.length === 0 ? (
          <div>У вас нет dashboard-ов</div>
        ) : (
          contextData.data.accessCharts?.map((el) => (
            <Link
              key={el.id}
              href={"/dashboard/" + el.id}
              className={cl(
                st.link,
                pathname?.includes(el.id) && st.link_active,
              )}
            >
              <ChartIcon />
              {el.name}
            </Link>
          ))
        )}
      </div>
      {children}
    </UserContext.Provider>
  )
}

export { ClientProvider, UserContext }
