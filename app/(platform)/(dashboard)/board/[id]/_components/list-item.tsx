"use client";

import { ListWithCards } from "@/types";

import { ListHeader } from "./list-header";
import { useState } from "react";

interface ListItemProps {
  list: ListWithCards;
  index: number;
}

export const ListItem = ({ list, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className='shrink-0 h-full w-[272px] select-none'>
      <div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
        <ListHeader onAddCard={() => {}} list={list} />
      </div>
    </li>
  );
};
