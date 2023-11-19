import { OrganizationList } from "@clerk/nextjs";

export default function Page() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={`/organization/:id`}
      afterCreateOrganizationUrl={`/organization/:id`}
    />
  );
}
