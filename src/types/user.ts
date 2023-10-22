interface IUser {
  _id: string
  username: string
  image: string | null
  role: string
  accessCharts: { id: string; name: string }[]
}

export type { IUser }
