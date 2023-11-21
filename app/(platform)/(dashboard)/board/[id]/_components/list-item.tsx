"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";

export interface ListItemProps {
  index: number;
  list: ListWithCards;
}

export function ListItem({ index, list }: ListItemProps) {
  return (
    <li className='shrink-0 h-full w-[272px] select-none'>
      <div className='w-full rounded-sm bg-[#f1f2f4] shadow-md pb-2'>
        <ListHeader list={list} />
      </div>
    </li>
  );
}
