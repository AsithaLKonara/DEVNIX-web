import "dotenv/config";
import { prisma } from "../lib/chatbot/prisma";

async function main() {
  const knowledge = await prisma.knowledge.findMany();
  console.log(JSON.stringify(knowledge, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
