import { ReactElement } from "react"
import { Poppins } from "next/font/google"

import { Providers } from "@/core/providers"
import "@/core/styles/global.scss"

const poppins = Poppins({
  weight: ["400", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

interface IHomeLayout {
  children: ReactElement
}

const MainLayout = ({ children }: IHomeLayout) => {
  return (
    <html lang="ru">
      <body className={poppins.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

export default MainLayout
