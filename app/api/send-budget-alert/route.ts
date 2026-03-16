import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email, category, remaining, amount } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "FinanceYou Budget Alerts <alerts@financeyou.site>",
      to: email,
      subject: `⚠️ Budget exceeded for ${category}`,
      html: `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:520px;margin:auto;background:white;padding:30px;border-radius:10px;border:1px solid #e5e7eb;">

          <h2 style="color:#111827;margin-bottom:10px;">
            ⚠️ Budget Alert
          </h2>

          <p style="color:#374151;font-size:16px;">
            Your budget for <strong>${category}</strong> has been exceeded.
          </p>

          <div style="margin:20px 0;padding:15px;background:#fef2f2;border-radius:6px;">
            <p style="margin:0;font-size:16px;">
              <strong>Latest expense added:</strong> $${Number(amount).toFixed(2)}
            </p>
            <p style="margin:5px 0 0 0;font-size:16px;color:#dc2626;">
              <strong>Remaining balance:</strong> $${Number(remaining).toFixed(2)}
            </p>
          </div>

          <a href="https://financeyou.site/dashboard/budgets"
            style="
              display:inline-block;
              margin-top:15px;
              padding:12px 20px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:6px;
              font-weight:600;
            ">
            View Your Budget
          </a>

          <p style="margin-top:30px;font-size:13px;color:#6b7280;">
            FinanceYou • Smart Budget Tracking
          </p>

        </div>
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