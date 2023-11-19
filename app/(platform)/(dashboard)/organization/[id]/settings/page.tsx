import { OrganizationProfile } from "@clerk/nextjs";
// prisma
// pscale_pw_jlcDStnZVFyZOHGhublO2h5wKghgocTISPPuM2n6DN8
export default function Page() {
  return (
    <div>
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
}
