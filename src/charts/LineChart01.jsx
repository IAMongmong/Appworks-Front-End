import { useRef, useEffect, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
} from "chart.js";
import { useThemeProvider } from "../utils/ThemeContext";

import { chartColors } from "./ChartjsConfig";
import "chartjs-adapter-moment";

// Import utilities
import { formatValue } from "../utils/Utils";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

function LineChart01({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "light";
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor, chartAreaBg } =
    chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: "line",
      data,
      options: {
        chartArea: {
          backgroundColor: darkMode ? chartAreaBg.light : chartAreaBg.dark
        },
        layout: {
          padding: 20
        },
        scales: {
          y: {
            // display: false,
            beginAtZero: true
          },
          x: {
            type: "time",
            time: {
              parser: "MM-DD-YYYY",
              unit: "month"
            }
            // display: false
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => false // Disable tooltip title
              // label: (context) => formatValue(context.parsed.y)
            },
            bodyColor: darkMode
              ? tooltipBodyColor.light
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.light
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.light
              : tooltipBorderColor.light
          },
          legend: {
            display: false
          }
        },
        interaction: {
          intersect: false,
          mode: "nearest"
        },
        maintainAspectRatio: false,
        resizeDelay: 200
      }
    });
    setChart(newChart);
    return () => newChart.destroy();
  }, []);

  useEffect(() => {
    if (!chart) return;
    if (darkMode) {
      chart.options.chartArea.backgroundColor = chartAreaBg.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    } else {
      chart.options.chartArea.backgroundColor = chartAreaBg.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

  return <canvas ref={canvas} width={width} height={height} />;
}

export default LineChart01;
