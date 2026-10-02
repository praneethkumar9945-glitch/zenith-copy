import { createFileRoute } from "@tanstack/react-router";
import { MarketingWorkspace } from "@/components/marketing-pr/MarketingWorkspace";

export const Route = createFileRoute("/_app/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing, Admissions & PR — Edusphere" },
      { name: "description", content: "Role-based marketing, admissions, sales, content, digital and outreach management." },
      { property: "og:title", content: "Marketing, Admissions & PR — Edusphere" },
      { property: "og:description", content: "Manage institutional campaigns, admissions, sales, content and outreach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MarketingWorkspace,
});
