import { Separator } from "@/components/ui/separator";
import Info from "./_components/info";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className='w-full mb-20'>
      <Info />
      <Separator className='my-4' />
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
}
