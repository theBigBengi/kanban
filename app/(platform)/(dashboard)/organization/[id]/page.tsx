import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscription";

export default async function Page() {
  const isPro = await checkSubscription();

  return (
    <div className='w-full mb-20'>
      <Info isPro={isPro} />
      <Separator className='my-4' />
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
}
