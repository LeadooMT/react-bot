import fs from "fs/promises";
import path from "path";

const distPath = path.resolve("dist");

try {
  await fs.rm(distPath, { recursive: true, force: true });
  console.log("✔ dist folder removed");
} catch (err) {
  console.error("Failed to remove dist:", err);
  process.exit(1);
}
