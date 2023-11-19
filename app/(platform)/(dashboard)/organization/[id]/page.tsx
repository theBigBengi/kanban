import { OrganizationSwitcher, auth } from "@clerk/nextjs";

export default function Page() {
  const { userId, orgId } = auth();

  return (
    <div>
      <OrganizationSwitcher hidePersonal />
    </div>
  );
}
