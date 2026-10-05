import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { heading: "Information we collect", body: "This demo site collects no personal data. When wallet features launch, public wallet addresses may be processed." },
        { heading: "Cookies", body: "We store only your theme preference locally in your browser." },
        { heading: "Contact", body: "Questions about privacy can be sent through our community channels." },
      ]}
    />
  );
}
