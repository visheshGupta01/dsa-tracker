import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/revision")({
  head: () => ({ meta: [
    { title: "Revision · DSA Journey" }, { name: "description", content: "Review due, overdue, and upcoming DSA problems with spaced repetition." },
    { property: "og:title", content: "Revision · DSA Journey" }, { property: "og:description", content: "Keep solved DSA problems fresh with a personal revision queue." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: () => <DsaJourney section="Revision" />,
});