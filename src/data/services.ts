import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Code2,
  Workflow,
  MessageSquareText,
  Lightbulb,
  ShieldCheck,
  Rocket,
  Users,
  Clock,
  Globe2,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
};

export const services: Service[] = [
  {
    title: "AI Development",
    description:
      "Custom AI models, agents and intelligent features designed around your business needs.",
    icon: BrainCircuit,
    color: "from-violet-600 to-indigo-600",
    features: ["AI agents & copilots", "LLM integration", "Custom AI features"],
  },
  {
    title: "Software Development",
    description:
      "Modern web and mobile applications built to be fast, secure and scalable.",
    icon: Code2,
    color: "from-blue-600 to-cyan-500",
    features: ["Web applications", "Mobile apps", "APIs & backends"],
  },
  {
    title: "AI Automation",
    description:
      "Automate repetitive work and connect your tools so your team can focus on growth.",
    icon: Workflow,
    color: "from-emerald-500 to-teal-500",
    features: ["Workflow automation", "Document processing", "Tool integrations"],
  },
  {
    title: "Chatbot Development",
    description:
      "Smart chatbots for websites, WhatsApp and internal teams that answer 24/7.",
    icon: MessageSquareText,
    color: "from-pink-500 to-rose-500",
    features: ["Customer support bots", "Sales assistants", "Knowledge-base bots"],
  },
  {
    title: "AI Consulting",
    description:
      "Expert guidance to find where AI fits in your organization and how to adopt it.",
    icon: Lightbulb,
    color: "from-orange-500 to-amber-400",
    features: ["AI strategy", "Feasibility studies", "Team training"],
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing monitoring, updates and improvements to keep your systems running smoothly.",
    icon: ShieldCheck,
    color: "from-fuchsia-600 to-purple-600",
    features: ["24/7 monitoring", "Bug fixes & updates", "Performance tuning"],
  },
];

export const reasons = [
  {
    title: "Fast Delivery",
    description: "Agile sprints with regular demos so you see progress every week.",
    icon: Rocket,
  },
  {
    title: "Expert Team",
    description: "Developers and AI engineers with hands-on industry experience.",
    icon: Users,
  },
  {
    title: "Reliable Support",
    description: "We stay with you after launch to keep everything running.",
    icon: Clock,
  },
  {
    title: "Global Standards",
    description: "Clean code, secure systems and clear communication for clients worldwide.",
    icon: Globe2,
  },
];

export const budgetOptions = [
  "Less than $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "More than $15,000",
  "Not sure yet",
];