import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal.tsx";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import Header from "./header";
import { Description } from "./decription";
import Actions from "./action";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";

export interface CardModalProps {}

export function CardModal(props: CardModalProps) {
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const id = useCardModal((state) => state.id);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <Header card={cardData} /> : <Header.Skeleton />}
        <div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
          <div className='col-span-3'>
            <div className='w-full space-y-6'>
              {cardData ? (
                <Description card={cardData} />
              ) : (
                <Description.Skeleton />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>

          {cardData ? <Actions card={cardData} /> : <Actions.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
