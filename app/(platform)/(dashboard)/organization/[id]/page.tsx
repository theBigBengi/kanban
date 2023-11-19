import { db } from "@/lib/db";
import { Form } from "./form";

export default async function Page() {
  //   const boards = await db.board.findMany();

  return (
    <div className='flex flex-col space-y-4'>
      <Form />
      <div className='space-y-2'>
        {/* {boards.map((board: any) => (
          <div key={board.id}>{board.title}</div>
        ))} */}
      </div>
    </div>
  );
}
