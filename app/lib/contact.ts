// lib/contact.ts
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const OWNER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_OWNER_TEMPLATE_ID!;
const CONFIRMATION_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export async function submitContactForm(formData: {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { fullName, email, phone, message } = formData;

  try {
    // 1. Notify site owner
    await emailjs.send(
      SERVICE_ID,
      OWNER_TEMPLATE_ID,
      {
        from_name: fullName,
        from_email: email,
        phone: phone || "Not provided",
        message: message,
      },
      PUBLIC_KEY,
    );

    // 2. Send acknowledgment to sender
    await emailjs.send(
      SERVICE_ID,
      CONFIRMATION_TEMPLATE_ID,
      {
        to_name: fullName,
        to_email: email,
      },
      PUBLIC_KEY,
    );

    return { success: true };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, message: "Failed to send message." };
  }
}
