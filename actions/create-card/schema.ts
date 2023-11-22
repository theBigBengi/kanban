import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  listId: z.string(),
  boardId: z.string(),
});
