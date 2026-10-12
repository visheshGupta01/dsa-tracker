import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [
    { title: "Roadmap · DSA Journey" }, { name: "description", content: "Track progress through the Striver A2Z data structures and algorithms roadmap." },
    { property: "og:title", content: "Roadmap · DSA Journey" }, { property: "og:description", content: "Your 17-step Striver A2Z learning roadmap." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: () => <DsaJourney section="Roadmap" />,
});