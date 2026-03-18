// lib/contact.ts
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const OWNER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_OWNER_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export async function submitContactForm(formData: {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { fullName, email, phone, message } = formData;

  try {
    // Initialize EmailJS on first use
    emailjs.init(PUBLIC_KEY);

    // Send to owner template (auto-reply is triggered by EmailJS template rules)
    await emailjs.send(
      SERVICE_ID,
      OWNER_TEMPLATE_ID,
      {
        from_name: fullName,
        from_email: email,
        from_company: "Fitness Center",
        phone: phone || "Not provided",
        message: message,
      },
      PUBLIC_KEY,
    );

    return { success: true };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, message: "Failed to send message." };
  }
}
