import { User } from "@/models/userModel";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;

export async function userSeed() {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASS) {
      console.log(
        "⚠️ ADMIN_EMAIL or ADMIN_PASS is missing from environment variables"
      );
      return;
    }
    // Check if admin already exists
    const adminEmail = ADMIN_EMAIL;
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: adminEmail,
      password: ADMIN_PASS,
      role: "admin",
    });

    console.log("✅ Admin user created:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}
