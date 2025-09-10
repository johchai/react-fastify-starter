import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashed_password = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "admin@example.com",
      hashed_password,
      role: "admin"
    }
  });

  // make a post
  const post = await prisma.post.create({
    data: {
      title: "Hello World",
      content: "This is my first post!",
      user_id: admin.id
    }
  });

  console.log("Admin user created:", admin);
  console.log("Sample post created:", post);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
