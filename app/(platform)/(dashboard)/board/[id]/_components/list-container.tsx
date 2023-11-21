"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

export function ListContainer({ lists, boardId }: ListContainerProps) {
  const [orderedList, setOrderedList] = useState(lists);

  useEffect(() => {
    setOrderedList(lists);
  }, [lists]);

  return (
    <ol className='flex gap-x-3 h-full'>
      {orderedList.map((list, index) => (
        <ListItem index={index} list={list} key={list.id} />
      ))}
      <ListForm />
      <div className='flex-shrink-0 w-1' />
    </ol>
  );
}
