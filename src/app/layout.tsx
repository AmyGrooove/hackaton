import { ReactElement } from "react"
import { Roboto } from "next/font/google"
import { Providers } from "@core/providers"

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
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

export default MainLayout
