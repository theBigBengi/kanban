"use client";

import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";

import { useAction } from "@/hooks/use-action";

export function Form() {
  const { execute, fieldErrors } = useAction(createBoard);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput id='title' errors={fieldErrors} />
      <FormSubmit variant='primary'>submit</FormSubmit>
    </form>
  );
}
