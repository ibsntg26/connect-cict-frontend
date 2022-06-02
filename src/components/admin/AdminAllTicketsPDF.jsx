import React from "react";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import Header from "./report-header.jpg";

export default function AdminAllTicketsPDF(ticketsData) {
  const doc = new jsPDF();

  ticketsData.forEach((ticket, index) => {
    doc.addImage(Header, "JPEG", 0, 0, 210, 0);
    doc.setDrawColor(250, 198, 115);
    doc.setFillColor(253, 137, 35);
    doc.rect(5, 65, 200, 12, "FD");
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Incident Report  #${ticket.id}`, 105, 73, null, null, "center");

    doc.rect(5, 77, 200, 25);
    doc.setTextColor(75);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Student No: ${ticket.student.student_id}`, 10, 85);
    doc.text(
      `Name: ${ticket.student.account.first_name} ${ticket.student.account.last_name}`,
      10,
      92
    );
    doc.text(
      `Year and Section: ${ticket.student.year_level.charAt(0)}${
        ticket.student.section
      }`,
      10,
      99
    );

    doc.setFillColor(253, 137, 35);
    doc.rect(5, 106, 200, 10, "FD");
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.text("Incident Details", 10, 113);

    doc.rect(5, 116, 200, 165);
    doc.setTextColor(75);
    doc.setFont("helvetica", "normal");
    doc.text(`Incident Type: ${ticket.type.name}`, 10, 124);
    doc.text(`Status: ${ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}`, 10, 131);

    let details = 'None';
    if (ticket.type.id === 7 && ticket.subject !== null)
        details = ticket.subject
    else if (ticket.other_info !== null)
        details = ticket.other_info

    doc.text(`Additional Details: ${details}`, 10, 138);

    let evaluator = "None";
    if (ticket.evaluator)
      evaluator =
        evaluator.account.first_name + " " + evaluator.account.last_name;

    doc.text(`Processed by: ${evaluator}`, 10, 145);

    doc.text(
      `Reported on: ${dayjs(ticket.date_created).format("D MMMM YYYY h:mm A")}`,
      10,
      152
    );

    doc.text("Resolution:", 10, 165);
    doc.text("Follow ups:", 10, 187);

    doc.text(`Page ${index + 1} of ${ticketsData.length}`, 105, 288, null, null, "center");

    if (index + 1 < ticketsData.length) doc.addPage("a4");
  });

  doc.save("report.pdf");
}
