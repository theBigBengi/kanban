"use client";

import { AlignLeft, Layout } from "lucide-react";

import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ElementRef, KeyboardEventHandler, useRef, useState } from "react";
import { FormTextarea } from "@/components/form/form-textarea";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

export interface DescriptionProps {
  card: CardWithList;
}

export function Description({ card }: DescriptionProps) {
  const [description, setDescription] = useState(card.description);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const queryClient = useQueryClient();
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (card) => {
      toast.success(`Card's description was updated`);
      setDescription(card.description);
      queryClient.invalidateQueries({ queryKey: ["card", card.id] });
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  function handleSubmit(formData: FormData) {
    const description = formData.get("description") as string;
    const boardId = params.id as string;

    execute({
      description,
      boardId,
      id: card.id,
    });
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>Description</p>
        {!isEditing ? (
          <div
            className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'
            onClick={enableEditing}
            role='button'
          >
            {description ?? "Add some description..."}
          </div>
        ) : (
          <form ref={formRef} action={handleSubmit} className='space-y-2'>
            <FormTextarea
              placeholder='Enter a title for this card...'
              onKeyDown={onTextareakeyDown}
              errors={fieldErrors}
              ref={textareaRef}
              id='description'
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmit variant='primary'>Save</FormSubmit>
              <Button
                onClick={disableEditing}
                variant='ghost'
                type='button'
                size='sm'
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

Description.Skeleton = function HeaderSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='h-[78px] w-full bg-neutral-200' />
      </div>
    </div>
  );
};
