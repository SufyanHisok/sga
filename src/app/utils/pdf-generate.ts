import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export const generatePDF = async (elementId: string): Promise<Blob> => {
  const input = document.getElementById(elementId);
  if (!input) throw new Error("PDF source not found");

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  return pdf.output("blob");
};