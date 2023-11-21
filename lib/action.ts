"use server";

import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { db } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// This is temporary until @types/react-dom is updated
export type State = {
  message?: string | null;
  success?: boolean;
  errors?: {
    title?: string[];
    image?: string[];
  };
};

const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  image: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
});

export async function createBoard(prevState: State, formData: FormData) {
  const validationResult = CreateBoardSchema.safeParse({
    image: formData.get("image"),
    title: formData.get("title"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { title, image } = validationResult.data;

  try {
    console.log({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "database error",
    };
  }

  revalidatePath(`/board`);
  redirect("/");
  //   return { data: board };
}

const UpdateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    }),
});

export async function updateBoard(
  id: string,
  // prevState: any,
  formData: FormData
) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      message: "Unauthorized",
    };
  }

  const validationResult = UpdateBoardSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Board.",
    };
  }

  const { title } = validationResult.data;

  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "database error",
    };
  }

  revalidatePath(`/board${id}`);
  return { data: { board } };
  // redirect("/");
}

export async function deleteBoard(id: string) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      message: "Unauthorized",
    };
  }

  try {
    await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (error) {
    return {
      message: "database error",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
}
