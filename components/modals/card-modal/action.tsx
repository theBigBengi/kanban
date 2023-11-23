"use client";

import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useCardModal } from "@/hooks/use-card-modal.tsx";

export interface ActionsProps {
  card: CardWithList;
}

export default function Actions({ card }: ActionsProps) {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (card) => {
        toast.success(`Card deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (card) => {
        toast.success(`Card copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  function handleDeleteCard() {
    const boardId = params.id as string;
    executeDelete({ boardId, id: card.id });
  }

  function handleCopyCard() {
    const boardId = params.id as string;
    executeCopy({ boardId, id: card.id });
  }

  return (
    <div className='space-y-2 mt-2'>
      <p className='text-sm font-semibold'>Actions</p>
      <Button
        className='w-full justify-start'
        onClick={handleCopyCard}
        disabled={isLoadingCopy}
        variant='gray'
        size='inline'
      >
        <Copy className='h-4 w-4 mr-2' />
        Copy
      </Button>
      <Button
        className='w-full justify-start'
        disabled={isLoadingDelete}
        onClick={handleDeleteCard}
        variant='gray'
        size='inline'
      >
        <Trash className='h-4 w-4 mr-2' />
        Delete
      </Button>
    </div>
  );
}

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
  );
};
