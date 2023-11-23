"use client";

import { useEffect, useState } from "react";

import { CardModal } from "../modals/card-modal";
import { ProModal } from "../modals/pro-modal";

export function ModalProvider() {
  const [isMaunted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMaunted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
}
