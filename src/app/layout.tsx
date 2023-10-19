import { ReactElement } from "react"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

interface IHomeLayout {
  children: ReactElement
}

const MainLayout = ({ children }: IHomeLayout) => {
  return (
    <html lang="ru">
      <body className={roboto.className}>
          <main>{children}</main>
      </body>
    </html>
  )
}

export default MainLayout
