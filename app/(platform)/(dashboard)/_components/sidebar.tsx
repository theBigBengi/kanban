"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@radix-ui/react-accordion";
import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

export default function Sidebar({
  storageKey = "t-sidebar-state",
}: SidebarProps) {
  const [expended, setExpended] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrganization } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expended).reduce(
    (acc: string[], key: string) => {
      if (expended[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpended((currentValue) => ({
      ...currentValue,
      [id]: !expended[id],
    }));
  };

  if (!isLoadedOrgList || !isLoadedOrganization || userMemberships.isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <div className='font-medium text-xs flex items-center mb-1'>
        <span className='pl-4'>Workspaces</span>
        <Button asChild size='icon' variant='ghost' className='ml-auto'>
          <Link href='/select-org'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            organization={organization as Organization}
            onExpand={onExpand}
            isExpanded={expended[organization.id]}
            isActive={activeOrganization?.id === organization.id}
          />
        ))}
      </Accordion>
    </>
  );
}
