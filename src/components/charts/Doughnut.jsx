import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props) {
  return (
    <Doughnut
      data={{
        labels: ["Open", "Processed by others", "Processed by me", "Closed by me"],
        datasets: [
          {
            label: "Incident Tickets by Status",
            data: [props.all_open, props.all_others_processing, props.all_my_processing, props.all_my_closed],
            backgroundColor: [
              "rgba(108, 117, 125, 0.75)",
              "rgba(255, 193, 7, 0.75)",
              "rgba(255, 110, 0, 0.75)",
              "rgba(30, 203, 123, 0.75)",
            ],
            hoverOffset: 5,
          },
        ],
      }}
    />
  );
}
