import { API_URL } from "@/constants"
import { IDashboard } from "@/types/dashboard"

const getChart = async (chartId: string): Promise<IDashboard | Error> => {
  const res = await fetch(`${API_URL}/chart/getChart?id=${chartId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  return res.ok ? res.json() : new Error("Failed to fetch data")
}

export { getChart }
