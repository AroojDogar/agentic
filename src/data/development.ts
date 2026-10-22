import type { LucideIcon } from "lucide-react";
import {
  Bot,
  MessageSquare,
  Globe,
  Smartphone,
  Workflow,
  Database,
} from "lucide-react";

export type Offering = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export const offerings: Offering[] = [
  {
    title: "AI Agents",
    description:
      "Autonomous agents that research, decide and take actions across your business tools.",
    icon: Bot,
    color: "from-violet-600 to-indigo-600",
  },
  {
    title: "Chatbots & Assistants",
    description:
      "Smart conversational assistants for customer support, sales and internal teams.",
    icon: MessageSquare,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Web Applications",
    description:
      "Fast, secure and scalable web platforms built with modern frameworks.",
    icon: Globe,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform mobile apps with AI features built right in.",
    icon: Smartphone,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks and connect your tools to save hours every week.",
    icon: Workflow,
    color: "from-orange-500 to-amber-400",
  },
  {
    title: "Data & ML Solutions",
    description:
      "Turn your data into insights with dashboards, analytics and machine learning.",
    icon: Database,
    color: "from-fuchsia-600 to-purple-600",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We understand your goals, users and challenges in detail.",
  },
  {
    step: "02",
    title: "Design",
    description: "We plan the architecture and design a clear user experience.",
  },
  {
    step: "03",
    title: "Develop",
    description: "We build in short sprints with regular demos and feedback.",
  },
  {
    step: "04",
    title: "Deploy & Support",
    description: "We launch, monitor and keep improving your product.",
  },
];

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "OpenAI",
  "Claude",
  "LangChain",
  "PostgreSQL",
  "Tailwind CSS",
  "Vercel",
];

export const projects = [
  {
    title: "AI Customer Support Agent",
    category: "AI Agent",
    description:
      "A 24/7 support agent that answers customer questions and books appointments automatically.",
    tags: ["Next.js", "OpenAI", "PostgreSQL"],
    color: "from-violet-600 to-indigo-600",
  },
  {
    title: "Smart Ordering Platform",
    category: "Web Application",
    description:
      "QR-based ordering system for restaurants with a live kitchen dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Business Analytics Dashboard",
    category: "Data Solution",
    description:
      "Real-time dashboard that tracks sales, users and performance metrics.",
    tags: ["React", "Python", "Charts"],
    color: "from-pink-500 to-orange-400",
  },
];