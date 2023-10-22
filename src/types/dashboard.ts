import { IChart } from "./chart"

interface IDashboard {
  _id: string
  name: string
  data: IChart[]
}

export type { IDashboard }
