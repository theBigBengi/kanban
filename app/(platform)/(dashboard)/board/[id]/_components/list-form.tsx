"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ListWrapper } from "./list-wrapper";
import { FormInput } from "@/components/form/form-input";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { createList } from "@/lib/actions/list";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export function ListForm() {
  const [isEditing, setIsEditing] = useState(false);
  const initialState: any = {};
  const [state, dispatch] = useFormState(createList, initialState);

  useEffect(() => {
    if (!state?.success) {
      toast(state.message);
    } else {
      toast("created");
      disableEditing();
    }
  }, [state]);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
          action={dispatch}
          ref={formRef}
        >
          <FormInput
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
            ref={inputRef}
            id='title'
            placeholder='Enter list title...'
            errors={state?.errors}
          />
          <input hidden value={params.id} name='boardId' />

          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size='sm' variant='ghost'>
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button
        className='w-full p-3 rounded-md bg-white/80 hover:bg-white/50 transition flex items-center font-medium text-sm'
        onClick={enableEditing}
      >
        <Plus className='h-4 w-4 mr-2' />
        Add a List
      </Button>
    </ListWrapper>
  );
}
