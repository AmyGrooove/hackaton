interface IChart {
  id: string
  values: {
    time: string
    value: number
    _id: string
  }[]
}

export type { IChart }
