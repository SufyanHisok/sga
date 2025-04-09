import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const config = {
    api: {
      bodyParser: {
        sizeLimit: "10mb", // increase for large PDFs
      },
    },
  };
  export async function POST(req: Request) {
    try {
      const { email, pdfData, filename } = await req.json();
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hisokacsgo2000@gmail.com",
          pass: "tmdt afnm jxch qxcy",
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Meal Plan Invoice",
        text: "Please find your attached grocery summary.",
        attachments: [
          {
            filename,
            content: Buffer.from(pdfData.split("base64,")[1], "base64"),
            encoding: "base64",
          },
        ],
      };
  
      await transporter.sendMail(mailOptions);
  
      return NextResponse.json({ message: "Email sent" });
    } catch (error) {
      console.error("Email send failed:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  }