import { connectToDatabase } from "@/lib/mongoose";
import { userSeed } from "./userSeed";
import { questionsSeed } from "./questionsSeed";
import { seedModules } from "./modulesSeed";

async function seed() {
  console.log("seed started");

  await connectToDatabase();
  await userSeed();
  await questionsSeed();
  await seedModules();
  process.exit();
}

seed();
