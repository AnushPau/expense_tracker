import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConfig";
import { UserCards } from "@/utils/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(req, context) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const cardId = Number(params.id);

    if (Number.isNaN(cardId)) {
      return NextResponse.json({ error: "Invalid card id" }, { status: 400 });
    }

    const deletedCard = await db
      .delete(UserCards)
      .where(
        and(
          eq(UserCards.id, cardId),
          eq(UserCards.userId, userId)
        )
      )
      .returning();

    return NextResponse.json({
      success: true,
      deletedCard,
    });
  } catch (error) {
    console.log("DELETE CARD ERROR:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}