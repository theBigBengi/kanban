"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteBoard } from "@/lib/action";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

export function BoardOptions({ id }: BoardOptionsProps) {
  async function handleDelete() {
    const result = await deleteBoard(id);

    if (result?.message) {
      toast.error(result.message);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='transparent'>
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          Board Options
        </div>
        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          variant='ghost'
          onClick={handleDelete}
          //   disabled={isLoading}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        >
          Delete Boaard
        </Button>
      </PopoverContent>
    </Popover>
  );
}
