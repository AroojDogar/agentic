import { Resend } from "resend";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Email is not configured. Check RESEND_API_KEY and EMAIL_FROM.");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, subject, html, replyTo });

  if (error) {
    throw new Error(error.message);
  }
}

// User ka likha text email mein safely dikhane ke liye
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Details ko ek saaf table ki shakal mein email ke liye banata hai
export function emailTemplate(title: string, rows: [string, string | undefined][]) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#64748b;width:180px;">${label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#0f172a;">${escapeHtml(value ?? "—")}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#7c3aed,#2563eb,#06b6d4);padding:24px;border-radius:12px 12px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:20px;">${title}</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;">
        ${rowsHtml}
      </table>
      <p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:16px;">Agentic · Automated notification</p>
    </div>`;
}