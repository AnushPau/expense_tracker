import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email, category, remaining, amount } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Budget Alerts <alerts@financeyou.site>",
      to: email,
      subject: `Budget exceeded for ${category}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Budget Alert</h2>
          <p>Your budget for <strong>${category}</strong> has been exceeded.</p>
          <p><strong>Latest expense added:</strong> $${Number(amount).toFixed(2)}</p>
          <p><strong>Remaining balance:</strong> $${Number(remaining).toFixed(2)}</p>
          <p>Please review your spending in FinancYou.</p>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send budget alert email" },
      { status: 500 }
    );
  }
}