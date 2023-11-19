"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

export function Form() {
  const { execute, fieldErrors } = useAction(createBoard);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  console.log(fieldErrors);

  return (
    <form action={onSubmit}>
      <input
        id='title'
        name='title'
        required
        className='border-black border p-1'
      />
      {/* <Button type='submit' variant='primary'>
        submit
      </Button> */}
    </form>
  );
}
