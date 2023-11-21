"use client";

import { FormInput } from "@/components/form/form-input";
import { createList, updateList } from "@/lib/actions/list";
import { List } from "@prisma/client";

import { useParams } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

export interface ListHeaderProps {
  list: List;
}

export function ListHeader({ list }: ListHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const result = await updateList(formData);

    // On fields input errors
    if (result.errors) {
      return { errors: result.errors };
    }

    // On async errors
    if (result.message) {
      toast.error(result.message);
      return;
    }

    // On success
    setTitle(result.data?.list?.title || title);
    toast.success(`Renamed to ${result.data?.list?.title}`);
    disableEditing();
  };

  const [state, dispatch] = useFormState(handleSubmit, null);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

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
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      {isEditing ? (
        <form action={dispatch} ref={formRef} className='flex-1 px-[2px]'>
          <input hidden id='id' name='id' value={list.id} />
          <input hidden id='boardId' name='boardId' value={list.boardId} />
          <FormInput
            className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
            placeholder='Enter list title..'
            defaultValue={title}
            onBlur={onBlur}
            ref={inputRef}
            id='title'
            errors={state?.errors}
          />
        </form>
      ) : (
        <div
          className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'
          onClick={enableEditing}
        >
          {title}
        </div>
      )}
    </div>
  );
}
