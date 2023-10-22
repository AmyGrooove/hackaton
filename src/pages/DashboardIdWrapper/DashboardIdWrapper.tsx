"use client"

import { getChart } from "@/api"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import st from "./DashboardIdWrapper.module.scss"
import { IDashboard } from "@/types/dashboard"
import ChartItem from "./ChartItem/ChartItem"

const DashboardIdWrapper = () => {
  const { back } = useRouter()
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
    <div>
      <button onClick={() => back()}>back</button>
      <div className={st.charts}>
        {chartData.data.map((el) => (
          <ChartItem data={el} />
        ))}
      </div>
    </div>
  )
}

export { DashboardIdWrapper }
