import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart(props) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <Doughnut
      data={{
        labels: ["Open", "Processed by others", "Processed by me", "Closed by me"],
        datasets: [
          {
            label: "Incident Tickets by Status",
            data: [props.all_open, props.all_others_processing, props.all_my_processing, props.all_my_closed],
            backgroundColor: [
              "rgba(108, 117, 125, 0.9)",
              "rgba(236, 107, 86, 1)",
              "rgba(255, 193, 84, 1)",
              "rgba(71, 179, 156, 1)",
            ],
            hoverOffset: 5,
          },
        ],
      }}
    />
  );
}
