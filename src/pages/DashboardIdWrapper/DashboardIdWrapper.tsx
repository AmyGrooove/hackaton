"use client"

import { getChart } from "@/api"
import { IChart } from "@/types/chart"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const DashboardIdWrapper = () => {
  const pathname = usePathname()

  const [chartData, setChartData] = useState<IChart>({
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

  return <div>{JSON.stringify(chartData)}</div>
}

export { DashboardIdWrapper }
