import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // const { orgId, userId } = auth();

  // if (!orgId || !userId) {
  //   redirect("/select-org");
  // }

  const lists = await db.list.findMany({
    where: {
      boardId: params.id,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className='p-4 h-full overflow-x-auto'>
      <ListContainer boardId={params.id} lists={lists} />
    </div>
  );
}
