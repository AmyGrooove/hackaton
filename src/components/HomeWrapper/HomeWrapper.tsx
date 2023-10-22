"use client"

import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { upload, uploadUrl } from "@/api"

import st from "./HomeWrapper.module.scss"

const HomeWrapper = () => {
  const { push } = useRouter()

  const [tab, setTab] = useState(0)

  const [nameDash, setNameDash] = useState("")
  const [url, setUrl] = useState("")
  const [file, setFile] = useState<File>()

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files?.[0]) return

    await upload(e.target.files?.[0], nameDash).then((res) =>
      push("/dashboard/" + res),
    )
  }

  const urlHandler = async () => {
    await uploadUrl(nameDash, url).then((res) => push("/dashboard/" + res))
  }

  return (
    <div className={st.root}>
      <div className={st.modal}>
        {tab === 0 && (
          <div className={st.column}>
            <div className={st.header}>Введите название</div>
            <input
              type="text"
              className={st.input}
              placeholder="Название дашборда"
              onChange={(e) => setNameDash(e.target.value)}
              value={nameDash}
            />
            <button
              onClick={() => {
                if (nameDash === "") return

                setTab(1)
              }}
              className={st.button}
            >
              Далее
            </button>
          </div>
        )}
        {tab === 1 && (
          <div className={st.column}>
            <div onClick={() => setTab(0)} className={st.back}>
              ← Назад
            </div>
            <div className={st.header}>Способ загрузки</div>
            <div className={st.choose}>
              <div className={st.downloadWrapper}>
                <div className={st.label}>Выберите json-файл</div>
                <label>
                  <button>132</button>
                  <input type="file" onChange={handleChangeFile} />
                </label>
              </div>
              <div className={st.separate} />
              <div className={st.downloadWrapper}>
                <div className={st.label}>Введите url</div>
                <input
                  type="text"
                  className={st.input}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="url-ссылка"
                />
              </div>
            </div>
            <button onClick={() => urlHandler()} className={st.button}>
              Загрузить
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export { HomeWrapper }
