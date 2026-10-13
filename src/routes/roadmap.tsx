import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [
    { title: "DSA Sheet · DSA Journey" }, { name: "description", content: "Track your Striver A2Z DSA problem sheet." },
    { property: "og:title", content: "DSA Sheet · DSA Journey" }, { property: "og:description", content: "Your 17-step Striver A2Z learning roadmap." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: () => <DsaJourney section="DSA Sheet" />,
});