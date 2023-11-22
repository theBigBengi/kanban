"use server";

import { auth } from "@clerk/nextjs";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../db";

// This is temporary until @types/react-dom is updated
export type State = {
  message?: string | null;
  success?: boolean;
  errors?: {
    title?: string[];
    image?: string[];
  };
};

const CreateListSchema = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, {
      message: "Title is too short",
    }),
  boardId: z.string(),
});

export async function createList(formData: FormData) {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return {
      message: "Unauthorized",
    };
  }

  const validationResult = CreateListSchema.safeParse({
    title: formData.get("title"),
    boardId: formData.get("boardId"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { title, boardId } = validationResult.data;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        message: "Board not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const order = lastList?.order ?? 1;

    const newList = await db.list.create({
      data: {
        title,
        boardId,
        order,
      },
    });

    revalidatePath(`/board/${boardId}`);

    return { data: { list: newList } };
  } catch (error) {
    return {
      message: "Faild to create List",
    };
  }
}

const UpdateListSchema = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, {
      message: "Title is too short",
    }),
  boardId: z.string(),
  id: z.string(),
});

export async function updateList(formData: FormData) {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return {
      message: "Unauthorized",
    };
  }

  // Validate user input
  const validationResult = UpdateListSchema.safeParse({
    title: formData.get("title"),
    boardId: formData.get("boardId"),
    id: formData.get("id"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update List Title.",
    };
  }

  const { title, boardId, id } = validationResult.data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "Faild to update List's title. Try again later.",
    };
  }

  // refersh
  revalidatePath(`/board/${boardId}`);

  return { data: { list } };
}

const DeleteListSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});

export async function deleteList(formData: FormData) {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return {
      message: "Unauthorized",
    };
  }

  // Validate user input
  const validationResult = DeleteListSchema.safeParse({
    boardId: formData.get("boardId"),
    id: formData.get("id"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update List Title.",
    };
  }

  const { boardId, id } = validationResult.data;

  try {
    await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error) {
    return {
      message: "Faild to update List's title. Try again later.",
    };
  }

  // refersh
  revalidatePath(`/board/${boardId}`);
  return {};
}

const CopyListSchema = z.object({
  boardId: z.string(),
  id: z.string(),
});

export async function copyList(formData: FormData) {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return {
      message: "Unauthorized",
    };
  }

  // Validate user input
  const validationResult = DeleteListSchema.safeParse({
    boardId: formData.get("boardId"),
    id: formData.get("id"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update List Title.",
    };
  }

  const { boardId, id } = validationResult.data;

  try {
    await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error) {
    return {
      message: "Faild to update List's title. Try again later.",
    };
  }

  // refersh
  revalidatePath(`/board/${boardId}`);
  return {};
}
