"use client"

import { UserContext } from "@core/providers/ClientProvider"
import Link from "next/link"
import { useContext } from "react"

const HomeWrapper = () => {
  const { data } = useContext(UserContext)

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.accessCharts.map((el) => (
        <Link key={el} href={"/dashboard/" + el}>
          {el}
        </Link>
      ))}
    </div>
  )
}

export { HomeWrapper }
