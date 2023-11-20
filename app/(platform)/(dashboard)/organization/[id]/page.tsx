import { Separator } from "@/components/ui/separator";
import Info from "./_components/info";
import { BoardList } from "./_components/board-list";

export default async function Page() {
  return (
    <div className='w-full mb-20'>
      <Info />
      <Separator className='my-4' />
      <BoardList />
    </div>
  );
}
