"use client";

import { Layout } from "lucide-react";
import * as React from "react";

import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export interface HeaderProps {
  card: CardWithList;
}

export default function Header({ card }: HeaderProps) {
  const [title, setTitle] = React.useState(card.title);
  const queryClient = useQueryClient();
  const { execute } = useAction(updateCard, {
    onSuccess: (card) => {
      setTitle(card.title);
      queryClient.invalidateQueries({ queryKey: ["card", card.id] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const params = useParams();
  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  function onBlur() {
    inputRef.current?.form?.requestSubmit();
  }

  function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const boardId = params.id as string;

    execute({
      title,
      boardId,
      id: card.id,
    });
  }

  return (
    <div className='flex items-start gap-x-3 mb-6 w-full'>
      <Layout className='h-5 w-5 mt-1 text-neutral-700' />
      <div className='w-full'>
        <form action={handleSubmit}>
          <FormInput
            className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate'
            defaultValue={title}
            onBlur={onBlur}
            ref={inputRef}
            id='title'
          />
        </form>
        <p className='text-sm text-muted-foreground'>
          in list <span className='underline'>{card.list.title}</span>
        </p>
      </div>
    </div>
  );
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className='flex items-start gap-x-3 mb-6'>
      <Skeleton className='h-6 w-6 mt-1 bg-neutral-700' />
      <div className=''>
        <Skeleton className='h-6 w-24 mb-1 bg-neutral-200' />
        <Skeleton className='h-4 w-12 mb-1 bg-neutral-200' />
      </div>
    </div>
  );
};
