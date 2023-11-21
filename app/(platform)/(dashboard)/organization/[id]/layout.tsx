import { auth } from "@clerk/nextjs";
import { OrgControl } from "./_components/org-control";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "Organization"),
  };
}

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}
