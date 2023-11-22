import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

export interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const params = useParams();

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (_card) => {
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    function handleSubmit(formData: FormData) {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.id as string;

      execute({ title, listId, boardId });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    if (isEditing) {
      return (
        <form
          className='m-1 py-0.5 px-1 space-y-4'
          action={handleSubmit}
          ref={formRef}
        >
          <FormTextarea
            placeholder='Enter a title for this card...'
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors}
            id='title'
            ref={ref}
          />
          <input hidden id='listId' name='listId' value={listId} />

          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size='sm' variant='ghost'>
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className='pt-2 px-2'>
        <Button
          onClick={enableEditing}
          className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
          size='sm'
          variant='ghost'
        >
          <Plus className='h-4 w-4 mr-2' />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
