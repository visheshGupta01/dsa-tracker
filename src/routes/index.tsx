import { createFileRoute } from "@tanstack/react-router";
import { DsaJourney } from "@/components/dsa-journey";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dashboard · DSA Journey" },
    { name: "description", content: "Your daily Striver A2Z study plan, DSA progress, revisions, and streak at a glance." },
    { property: "og:title", content: "Dashboard · DSA Journey" },
    { property: "og:description", content: "A personal dashboard for your Striver A2Z and C++ learning journey." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <DsaJourney section="Dashboard" />,
});
