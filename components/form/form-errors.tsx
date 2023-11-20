import { XCircle } from "lucide-react";

interface FormErrosProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormErros({ id, errors }: FormErrosProps) {
  if (!errors) return null;

  return (
    <div
      className='mt-2 text-xs text-rose-500'
      id={`${id}-error`}
      aria-live='polite'
    >
      {errors?.[id]?.map((error: string) => (
        <div
          className='flex items center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm'
          key={`${id}-${error}`}
        >
          <XCircle className='h-4 w-4 mr-2' />
          {error}
        </div>
      ))}
    </div>
  );
}
