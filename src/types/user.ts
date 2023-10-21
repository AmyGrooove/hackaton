interface IUser {
  _id: string
  username: string
  image: string | null
  role: string
  accessCharts: string[]
}

export type { IUser }
