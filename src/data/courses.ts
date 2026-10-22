import type { LucideIcon } from "lucide-react";
import {
  Brain,
  MessageSquareCode,
  Bot,
  FileCode2,
  Layers,
  Workflow,
} from "lucide-react";

export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  mode: string;
  fee: string;
  icon: LucideIcon;
  color: string;
  outcomes: string[];
  modules: string[];
};

export const courses: Course[] = [
  {
    slug: "ai-fundamentals",
    title: "AI Fundamentals",
    shortDescription: "Understand how AI works and how it is changing every industry.",
    description:
      "A beginner-friendly course that explains artificial intelligence, machine learning and generative AI in simple terms, with practical examples you can use at work right away.",
    level: "Beginner",
    duration: "6 Weeks",
    mode: "Online",
    fee: "$149",
    icon: Brain,
    color: "from-violet-600 to-indigo-600",
    outcomes: [
      "Understand core AI and ML concepts",
      "Use AI tools for daily productivity",
      "Identify AI opportunities in business",
      "Understand AI ethics and limitations",
    ],
    modules: [
      "Introduction to Artificial Intelligence",
      "Machine Learning Basics",
      "Generative AI & Large Language Models",
      "AI Tools for Productivity",
      "AI in Business & Industry",
      "Ethics, Safety & Future of AI",
    ],
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    shortDescription: "Get expert-level results from ChatGPT, Claude and other AI models.",
    description:
      "Learn how to write clear, powerful prompts and build reliable AI workflows for writing, research, coding and business tasks.",
    level: "Beginner",
    duration: "4 Weeks",
    mode: "Online",
    fee: "$99",
    icon: MessageSquareCode,
    color: "from-blue-600 to-cyan-500",
    outcomes: [
      "Write structured, effective prompts",
      "Use AI for research and content",
      "Build reusable prompt templates",
      "Evaluate and improve AI outputs",
    ],
    modules: [
      "How Language Models Think",
      "Prompt Structure & Techniques",
      "Prompts for Writing & Research",
      "Prompts for Coding",
      "Building Prompt Workflows",
    ],
  },
  {
    slug: "ai-agents-development",
    title: "Building AI Agents",
    shortDescription: "Build autonomous AI agents that use tools and complete real tasks.",
    description:
      "An advanced, project-based course where you design and build AI agents with TypeScript that can reason, use tools, call APIs and automate real business work.",
    level: "Advanced",
    duration: "10 Weeks",
    mode: "Online & On-campus",
    fee: "$399",
    icon: Bot,
    color: "from-pink-500 to-orange-400",
    outcomes: [
      "Design agent architectures",
      "Connect agents to tools and APIs",
      "Add memory and knowledge bases",
      "Deploy agents to production",
    ],
    modules: [
      "From Chatbots to AI Agents",
      "LLM APIs with TypeScript",
      "Tool Use & Function Calling",
      "Memory, RAG & Knowledge Bases",
      "Multi-Agent Systems",
      "Testing & Evaluating Agents",
      "Deployment & Final Project",
    ],
  },
  {
    slug: "python-for-ai",
    title: "Python for AI & ML",
    shortDescription: "Learn Python and build your first machine learning models.",
    description:
      "Start from Python basics and move to data analysis and machine learning, building real projects with popular libraries.",
    level: "Intermediate",
    duration: "8 Weeks",
    mode: "Online & On-campus",
    fee: "$249",
    icon: FileCode2,
    color: "from-emerald-500 to-teal-500",
    outcomes: [
      "Write clean Python code",
      "Analyze data with Pandas",
      "Train machine learning models",
      "Build an end-to-end ML project",
    ],
    modules: [
      "Python Basics",
      "Data Structures & Functions",
      "Data Analysis with Pandas",
      "Data Visualization",
      "Machine Learning with Scikit-learn",
      "Final ML Project",
    ],
  },
  {
    slug: "full-stack-nextjs",
    title: "Full-Stack Development with Next.js",
    shortDescription: "Build modern, AI-powered web apps with Next.js and TypeScript.",
    description:
      "Learn to build and deploy professional web applications using Next.js, TypeScript, Tailwind CSS and databases, including AI features.",
    level: "Intermediate",
    duration: "12 Weeks",
    mode: "Online & On-campus",
    fee: "$349",
    icon: Layers,
    color: "from-sky-500 to-blue-600",
    outcomes: [
      "Build full-stack apps with Next.js",
      "Work with databases and authentication",
      "Add AI features to web apps",
      "Deploy projects to Vercel",
    ],
    modules: [
      "HTML, CSS & Tailwind",
      "TypeScript Essentials",
      "React & Next.js App Router",
      "Databases & Prisma",
      "Authentication",
      "Adding AI Features",
      "Deployment & Portfolio Project",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation for Business",
    shortDescription: "Automate business workflows with AI, no heavy coding required.",
    description:
      "Learn how to connect AI with everyday business tools to automate emails, reports, customer support and more.",
    level: "Beginner",
    duration: "6 Weeks",
    mode: "Online",
    fee: "$179",
    icon: Workflow,
    color: "from-fuchsia-600 to-purple-600",
    outcomes: [
      "Map processes for automation",
      "Build AI-powered workflows",
      "Automate emails and reports",
      "Measure time and cost savings",
    ],
    modules: [
      "Automation Fundamentals",
      "No-code Automation Tools",
      "AI in Workflows",
      "Customer Support Automation",
      "Reporting & Data Automation",
      "Capstone Automation Project",
    ],
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export const admissionSteps = [
  { step: "01", title: "Choose a Course", description: "Browse our courses and pick the one that fits your goals." },
  { step: "02", title: "Apply Online", description: "Fill in the admission form with your details." },
  { step: "03", title: "Get Approved", description: "Our admissions team reviews your application." },
  { step: "04", title: "Start Learning", description: "Receive your LMS login by email and begin your classes." },
];