import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json();

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation échouée", errors: result.error.issues },
      { status: 400 }
    );
  }

  const { name, email, type, message } = result.data;

  const typeLabels: Record<string, string> = {
    residential: "Résidentiel",
    commercial: "Commercial",
    hospitality: "Hôtellerie",
    other: "Autre",
  };

  // Save to database (when DATABASE_URL is configured)
  if (process.env.DATABASE_URL) {
    const { prisma } = await import("@/lib/prisma");
    await prisma.contact.create({
      data: { name, email, type, message },
    });
  }

  // Send emails (when RESEND_API_KEY is configured)
  if (resend) {
    const contactEmail =
      process.env.CONTACT_EMAIL || "atelier@luminaquartz.fr";

    try {
      const r1 = await resend.emails.send({
        from: "Lumina & Quartz <onboarding@resend.dev>",
        to: [contactEmail],
        subject: `Nouvelle demande : ${typeLabels[type] || type}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #c4a882;">Nouvelle demande de contact</h2>
            <hr style="border: none; height: 1px; background: #c4a882;" />
            <table style="width: 100%; margin-top: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 120px;">Nom</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Type</td>
                <td style="padding: 8px 0;">${typeLabels[type] || type}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Message</td>
                <td style="padding: 8px 0;">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
          </div>
        `,
      });
      console.log("[resend] email 1 (atelier) →", contactEmail, r1);
    } catch (err) {
      console.error("[resend] email 1 failed", err);
    }

    // Only send acknowledgement if visitor email matches contact email
    // (Resend test mode only delivers to the account owner address)
    if (email === contactEmail) {
      try {
        const r2 = await resend.emails.send({
          from: "Lumina & Quartz <onboarding@resend.dev>",
          to: [email],
          subject: "Votre demande a bien été reçue | Lumina & Quartz",
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2 style="color: #c4a882;">Merci ${name},</h2>
              <p>Nous avons bien reçu votre demande et reviendrons vers vous sous 48 heures.</p>
              <hr style="border: none; height: 1px; background: #c4a882; margin: 24px 0;" />
              <p style="color: #888; font-size: 14px;">
                Lumina & Quartz, Architecture d'Intérieur<br>
                18 Rue de la Roquette, 75011 Paris
              </p>
            </div>
          `,
        });
        console.log("[resend] email 2 (client) →", email, r2);
      } catch (err) {
        console.error("[resend] email 2 failed", err);
      }
    }
  }

  return NextResponse.json({ success: true });
}
