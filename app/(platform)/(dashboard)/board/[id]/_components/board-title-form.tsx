"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { toast } from "sonner";
// import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { updateBoard } from "@/lib/action";

interface BoardTitleFormProps {
  board: Board;
}

export function BoardTitleForm({ board }: BoardTitleFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  // const initialState = { message: null, errors: {} };
  // const updateBoardWithId = updateBoard.bind(null, board.id);
  // const [state, dispatch] = useFormState(updateBoardWithId, initialState);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    if (inputRef.current?.value !== title) {
      formRef.current?.requestSubmit();
    } else {
      disableEditing();
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const { errors, data } = await updateBoard(board.id, formData);

    if (errors) {
      disableEditing();
      toast.error("Faild to update board title.", {
        description: errors.title?.join(", "),
      });
    } else {
      setTitle((title) => data?.board?.title || title);
      toast.success("board title updated successfuly");
      disableEditing();
    }
  };

  if (isEditing) {
    return (
      <form action={handleSubmit} ref={formRef}>
        <FormInput
          className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
          defaultValue={title}
          onBlur={onBlur}
          ref={inputRef}
          id='title'
        />
      </form>
    );
  }

  return (
    <Button
      className='font-bold text-lg h-auto w-auto p-1 px-2'
      onClick={enableEditing}
      variant='transparent'
    >
      {title}
    </Button>
  );
}
