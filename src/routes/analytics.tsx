import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [
    { title: "Analytics · DSA Journey" }, { name: "description", content: "See DSA problem-solving trends, study consistency, and roadmap completion." },
    { property: "og:title", content: "Analytics · DSA Journey" }, { property: "og:description", content: "Study time, problem trends, topic progress, and DSA activity." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: () => <DsaJourney section="Analytics" />,
});