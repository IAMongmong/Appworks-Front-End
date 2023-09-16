import { Chart as ChartJS, RadarController, RadialLinearScale } from "chart.js";
import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import useSkills from "../../hooks/dashboard/useSkills";
import { useCookies } from "react-cookie";

ChartJS.register(RadarController, RadialLinearScale);

function Skills() {
  const [chartData, setChartData] = useState(null);
  const [cookies] = useCookies(["student_id"]);
  const { student_id } = cookies;

  useEffect(() => {
    async function fetchData() {
      try {
        const values = await useSkills(student_id);

        const chartData = {
          labels: ["UIUX", "backend", "business analysis", "design thinking", "frontend"],
          datasets: [
            {
              label: "能力值",
              data: values,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchData();
  }, [student_id]);

  return (
    <div className="flex flex-col col-span-12 sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Skills</h2>
      </header>
      {student_id ? (
        <div className="flex align-center flex-col px-28">
          <div className="text-center my-4">學號：{student_id}</div>
          {chartData && <Radar data={chartData} />}
        </div>
      ) : (
        <div className="pt-20 text-center">尚未輸入數值，請先提交右側表單</div>
      )}
    </div>
  );
}

export default Skills;
