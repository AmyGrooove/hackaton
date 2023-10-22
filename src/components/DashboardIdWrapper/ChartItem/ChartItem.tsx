import { Chart } from "react-chartjs-2"
import { useMemo, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry,
  ArcElement,
  BarElement,
  RadialLinearScale,
} from "chart.js"

import { IChart } from "@/types/chart"
import { getRandomColor } from "@/utils"

import st from "./ChartItem.module.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  RadialLinearScale,
)

enum EChartTypes {
  line = "line",
  pie = "pie",
  bar = "bar",
  doughnut = "doughnut",
  polarArea = "polarArea",
  radar = "radar",
}

interface IChartItem {
  data: IChart
}

const ChartItem = ({ data }: IChartItem) => {
  const [chartType, setChartType] = useState<EChartTypes | string>(
    EChartTypes.line,
  )

  const colors = useMemo(
    () => data.values.map((elem) => getRandomColor(elem.value)),
    [],
  )

  const chartData = useMemo(
    () => ({
      labels: data.values.map((el) => new Date(el.time).toLocaleDateString()),
      datasets: [
        {
          label: "Chart",
          data: data.values.map((elem) => elem.value),
          backgroundColor: colors,
          borderColor: "black",
          borderWidth: 1,
          fill: true,
        },
      ],
    }),
    [data],
  )

  return (
    <div className={st.chart}>
      <select
        name="chart"
        value={chartType}
        className={st.select}
        onChange={(e) => setChartType(e.target.value)}
      >
        {(Object.keys(EChartTypes) as Array<keyof typeof EChartTypes>).map(
          (el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ),
        )}
      </select>
      <Chart data={chartData} type={chartType as keyof ChartTypeRegistry} />
    </div>
  )
}

export default ChartItem
