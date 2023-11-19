import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export function Navbar() {
  return (
    <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>

        <Button
          variant='primary'
          size='sm'
          className='rounded-sm hidden md:block h-auto py-1.5 px-2'
        >
          Create
        </Button>
        <Button
          size='sm'
          variant='primary'
          className='rounded-sm md:hidden block h-auto py-1.5 px-2'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>

      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={`//organization/:id`}
          afterSelectOrganizationUrl={`//organization/:id`}
          afterLeaveOrganizationUrl={`/select-org`}
          appearance={{
            elements: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              display: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
