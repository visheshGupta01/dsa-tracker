import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/revision")({
  head: () => ({ meta: [
    { title: "DSA Sheet · DSA Journey" }, { name: "description", content: "Revision is part of your DSA Sheet through the Needs Revision status." },
    { property: "og:title", content: "DSA Sheet · DSA Journey" }, { property: "og:description", content: "Keep solved DSA problems fresh with a personal revision queue." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: () => <DsaJourney section="Revision" />,
});