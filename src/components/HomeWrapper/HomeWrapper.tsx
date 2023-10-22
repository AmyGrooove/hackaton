"use client"

import { useContext } from "react"

import { UserContext } from "@/core/providers/ClientProvider"

import st from "./HomeWrapper.module.scss"

const HomeWrapper = () => {
  const { data } = useContext(UserContext)

  return (
    <div className={st.root}>
      <button>generate chart</button>
    </div>
  )
}

export { HomeWrapper }
