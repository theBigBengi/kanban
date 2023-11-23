"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id: cardId, boardId } = data;

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          boardId,
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return { error: "Card not found" };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    const copiedCard = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        order: newOrder,
        listId: cardToCopy.listId,
        description: cardToCopy.description,
      },
    });

    revalidatePath(`/board/${boardId}`);
    return { data: copiedCard };
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }
};

export const copyCard = createSafeAction(CopyCard, handler);
