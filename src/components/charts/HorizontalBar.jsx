import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function HorizontalBarChart(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  return (
    <Bar
      height={270}
      options={{
        indexAxis: "y",
        // responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    display: false,
                }
            },
            y: {
                grid: {
                    display: false,
                }
            },
        }
      }}
      data={{
        labels: [
          "Remaining balance",
          "Failed a subject",
          "Adding/changing subjects",
          "Subjects with INC mark",
          "Subjects from lower year",
          ["Subjects that are not", "available on current sem"],
          "Others",
        ],
        datasets: [
          {
            label: "Incident Tickets by Type",
            data: [
              props.balance,
              props.subject1,
              props.subject2,
              props.subject3,
              props.subject4,
              props.subject5,
              props.others,
            ],
            backgroundColor: "rgba(255, 193, 84, 1)",
            hoverOffset: 5,
          },
        ],
      }}
    />
  );
}
