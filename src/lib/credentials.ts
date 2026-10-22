import "server-only";
import { randomInt } from "node:crypto";
import { prisma } from "@/lib/prisma";

// 0/O aur 1/l/I jaise milte julte characters nikaal diye hain
const PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

export function generatePassword(length = 10) {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += PASSWORD_CHARS[randomInt(PASSWORD_CHARS.length)];
  }
  return password;
}

// AGT-2026-0001, AGT-2026-0002 ...
export async function generateStudentId() {
  const prefix = `AGT-${new Date().getFullYear()}-`;

  const last = await prisma.user.findFirst({
    where: { studentId: { startsWith: prefix } },
    orderBy: { studentId: "desc" },
    select: { studentId: true },
  });

  const lastNumber = last?.studentId ? Number(last.studentId.slice(prefix.length)) : 0;
  return `${prefix}${String(lastNumber + 1).padStart(4, "0")}`;
}