"use client";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Info() {
  const { isLoaded, organization } = useOrganization();

  if (!isLoaded) return <Info.Skeleton />;

  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Image
          className='rounded-sm object-cover'
          src={organization?.imageUrl!}
          alt='Organization'
          fill
        />
      </div>

      <div className='space-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        <div className='text-xs flex items-center text-muted-foreground'>
          <CreditCard className='h-3 w-3 mr-1' />
          Free
        </div>
      </div>
    </div>
  );
}

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Skeleton className='w-full h-full absolute' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-[200px]' />
        <div className='flex items-center'>
          <Skeleton className='h-4 w-4 mr-2' />
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </div>
    </div>
  );
};
