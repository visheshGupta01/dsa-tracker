import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/problems")({
  head: () => ({ meta: [
    { title: "DSA Sheet · DSA Journey" }, { name: "description", content: "Search and track your Striver A2Z DSA problems with simple statuses and revision built in." },
    { property: "og:title", content: "DSA Sheet · DSA Journey" }, { property: "og:description", content: "Your searchable personal DSA problem tracker." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: () => <DsaJourney section="DSA Sheet" />,
});