import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConfig";
import { UserCards } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const cards = await db
      .select()
      .from(UserCards)
      .where(eq(UserCards.userId, userId))
      .orderBy(desc(UserCards.createdAt));

    return NextResponse.json(cards);
  } catch (error) {
    console.log("GET CARDS FULL ERROR:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}