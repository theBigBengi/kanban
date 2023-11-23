"use client";

import { useEffect, useState } from "react";

import { CardModal } from "../modals/card-modal";

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
    </>
  );
}
