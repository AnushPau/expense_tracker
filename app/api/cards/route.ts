import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConfig";
import { UserCards } from "@/utils/schema";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cardName, brand, cardType, last4 } = await req.json();

    if (!cardName || !brand || !cardType || !last4) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^\d{4}$/.test(last4)) {
      return NextResponse.json(
        { error: "Last 4 must be exactly 4 digits." },
        { status: 400 }
      );
    }

    await db.insert(UserCards).values({
      userId,
      cardName,
      brand,
      cardType,
      last4,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("CARD API FULL ERROR:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}