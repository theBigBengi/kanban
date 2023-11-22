"use client";

import { ListWithCards } from "@/types";

import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

interface ListItemProps {
  list: ListWithCards;
  index: number;
}

export const ListItem = ({ list, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  return (
    <li className='shrink-0 h-full w-[272px] select-none'>
      <div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
        <ListHeader onAddCard={enableEditing} list={list} />
        {list.cards.map((card, index) => (
          <CardItem index={index} key={card.id} card={card} />
        ))}
        <CardForm
          disableEditing={disableEditing}
          enableEditing={enableEditing}
          isEditing={isEditing}
          ref={textareaRef}
          listId={list.id}
        />
      </div>
    </li>
  );
};
