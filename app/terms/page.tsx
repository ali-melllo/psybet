import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      sections={[
        { heading: "Demo notice", body: "Packs, prices and statistics on this site are demonstration content and do not represent live offers." },
        { heading: "Digital assets", body: "NFT purchases carry risk. Nothing here is financial advice." },
        { heading: "Changes", body: "These terms may be updated as the product evolves." },
      ]}
    />
  );
}
