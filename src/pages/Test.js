import React from "react";
import { jsPDF } from "jspdf";

import Header from "../components/admin/report-header.jpg";

const generatePDF = () => {
  const doc = new jsPDF();

  //   doc.text("Hello world!", 10, 10);
  doc.addImage(Header, "JPEG", 0, 0, 210, 0);
  doc.setDrawColor(250, 198, 115);
  doc.setFillColor(253, 137, 35);
  doc.rect(5, 65, 200, 12, "FD");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Incident Report  #123", 105, 73, null, null, "center");

  doc.rect(5, 77, 200, 27);
  doc.setTextColor(75);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Student No:", 10, 85);
  doc.text("Name:", 10, 92);
  doc.text("Year and Section:", 10, 99);

  doc.setFillColor(253, 137, 35);
  doc.rect(5, 104, 200, 10, "FD");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.text("Incident Details", 10, 111);

  doc.rect(5, 114, 200, 165);
  doc.setTextColor(75);
  doc.setFont("helvetica", "normal");
  doc.text("Incident Type:", 10, 124);
  doc.text("Additional Details:", 10, 131);
  doc.text("Processed by:", 10, 138);
  doc.text("Reported on:", 10, 145);

  doc.text("Resolution:", 10, 158);
  doc.text("Follow ups:", 10, 180);

  doc.text("Page", 105, 288, null, null, "center");
  doc.save("a4.pdf");
};

const Test = () => {
  return (
    // <PDFTicketsReport />
    <div>
      <button onClick={generatePDF}>Generate</button>
    </div>
  );
};

export default Test;
