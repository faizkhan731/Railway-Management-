import jsPDF from "jspdf";
import QRCode from "qrcode";

export const downloadTicket = async (ticket) => {
  const doc = new jsPDF("p", "mm", "a4");

  // ===== HEADER =====
  doc.setFillColor(0, 102, 204);
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("INDIAN RAILWAYS", 105, 12, { align: "center" });

  doc.setFontSize(12);
  doc.text("E-TICKET / RESERVATION SLIP", 105, 20, { align: "center" });

  doc.setTextColor(0, 0, 0);

  // ===== MAIN BORDER =====
  doc.rect(10, 35, 190, 150);

  // ===== PNR + TRAIN INFO =====
  doc.setFontSize(12);
  doc.text(`PNR Number: ${ticket.pnr}`, 15, 45);
  doc.text(`Train No: ${ticket.train_no || "12951"}`, 120, 45);

  doc.setFontSize(13);
  doc.text(`${ticket.train_name}`, 15, 55);

  // ===== ROUTE INFO =====
  doc.setFontSize(12);
  doc.text(`From: ${ticket.from_station}`, 15, 65);
  doc.text(`To: ${ticket.to_station}`, 120, 65);

  doc.text(`Journey Date: ${ticket.date}`, 15, 75);
  doc.text(`Departure: ${ticket.departure_time || "06:00 AM"}`, 120, 75);

  // ===== PASSENGER TABLE HEADER =====
  doc.setFillColor(230, 230, 230);
  doc.rect(15, 85, 180, 10, "F");

  doc.text("Passenger Name", 18, 92);
  doc.text("Age", 90, 92);
  doc.text("Gender", 110, 92);
  doc.text("Coach", 135, 92);
  doc.text("Seat", 160, 92);
  doc.text("Class", 180, 92);

  // ===== PASSENGER DETAILS =====
  doc.text(ticket.passenger_name, 18, 105);
  doc.text(ticket.age || "25", 90, 105);
  doc.text(ticket.gender || "Male", 110, 105);
  doc.text(ticket.coach || "S5", 135, 105);
  doc.text(ticket.seat_number || "23", 160, 105);
  doc.text(ticket.class || "Sleeper", 180, 105);

  // ===== PAYMENT INFO =====
  doc.text(`Fare: ₹${ticket.fare || "750"}`, 15, 125);
  doc.text(`Payment Status: CONFIRMED`, 120, 125);

  // ===== QR CODE =====
  const qrData = `
    PNR: ${ticket.pnr}
    Name: ${ticket.passenger_name}
    Train: ${ticket.train_name}
    From: ${ticket.from_station}
    To: ${ticket.to_station}
    
  `;

  const qrImage = await QRCode.toDataURL(qrData);
  doc.addImage(qrImage, "PNG", 150, 135, 40, 40);

  // ===== FOOTER =====
  doc.setFontSize(9);
  doc.text(
    "This is a computer generated ticket. Please carry original ID proof during journey.",
    105,
    195,
    { align: "center" }
  );

  doc.save(`Ticket_${ticket.pnr}.pdf`);
};
