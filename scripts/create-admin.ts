import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.argv[2];

  if (!email) throw new Error("ADMIN_EMAIL is missing in .env");
  if (!password || password.length < 8) {
    throw new Error('Usage: npx tsx scripts/create-admin.ts "YourPassword123" (min 8 characters)');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
  });

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, role: "ADMIN" },
    create: { name: "Agentic Admin", email, password: hashedPassword, role: "ADMIN" },
  });

  console.log(`✅ Admin account ready: ${admin.email}`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});