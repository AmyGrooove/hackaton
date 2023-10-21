interface IChart {
  _id: string
  name: string
  data: {
    id: string
    values: string
  }[]
}

export type { IChart }
