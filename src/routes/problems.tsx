import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/problems")({
  head: () => ({ meta: [
    { title: "Problems · DSA Journey" }, { name: "description", content: "Search, organize, and update your C++ data structures and algorithms practice problems." },
    { property: "og:title", content: "Problems · DSA Journey" }, { property: "og:description", content: "Your searchable personal DSA problem tracker." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: () => <DsaJourney section="Problems" />,
});