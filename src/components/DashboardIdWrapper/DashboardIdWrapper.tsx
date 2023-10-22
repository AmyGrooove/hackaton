"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { getChart } from "@/api"
import { IDashboard } from "@/types/dashboard"

import st from "./DashboardIdWrapper.module.scss"
import ChartItem from "./ChartItem/ChartItem"

const DashboardIdWrapper = () => {
  const pathname = usePathname()

  const [chartData, setChartData] = useState<IDashboard>({
    _id: "",
    name: "",
    data: [],
  })

  const fetchChartData = async () => {
    const result = await getChart(pathname?.replace("/dashboard/", "") ?? "")

    if (result instanceof Error) return

    setChartData(result)
  }

  useEffect(() => {
    fetchChartData()

    const intervalId = setInterval(fetchChartData, 2000)

    return () => clearInterval(intervalId)
  }, [pathname])

  return (
    <div className={st.root}>
      {chartData.data.map((el) => (
        <ChartItem data={el} key={el.id} />
      ))}
    </div>
  )
}

export { DashboardIdWrapper }
