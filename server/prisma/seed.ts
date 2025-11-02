import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  let admin;
  if (existingAdmin) {
    console.log("Admin already exists, skipping creation.");
    admin = existingAdmin;
  } else {
    const hashed_password = await bcrypt.hash("admin123", 10);
    admin = await prisma.user.create({
      data: {
        name: "John Doe",
        email,
        hashed_password,
        role: "admin"
      }
    });
    console.log("Admin user created:", admin);
  }

  // Check if the sample post already exists
  const existingPost = await prisma.post.findFirst({
    where: {
      title: "Hello World",
      user_id: admin.id
    }
  });

  if (existingPost) {
    console.log("Sample post already exists, skipping creation.");
  } else {
    const post = await prisma.post.create({
      data: {
        title: "Hello World",
        content: "This is my first post!",
        user_id: admin.id
      }
    });
    console.log("Sample post created:", post);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
