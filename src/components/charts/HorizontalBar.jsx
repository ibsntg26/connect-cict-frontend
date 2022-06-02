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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HorizontalBarChart(props) {
  return (
    <Bar
      height={270}
      options={{
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
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
            label: "Incident Tickets by Status",
            data: [
              props.balance,
              props.subject1,
              props.subject2,
              props.subject3,
              props.subject4,
              props.subject5,
              props.other,
            ],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            hoverOffset: 5,
          },
        ],
      }}
    />
  );
}
