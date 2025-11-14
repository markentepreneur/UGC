import fs from "fs/promises";
import path from "path";

export const uploadFile = async (file: File, savePath: string) => {
  // Split directory and file name
  const uploadDir = path.dirname(path.join(process.cwd(), "public", savePath));

  // Ensure the directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // Write the file directly to the final file path
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", savePath);
  await fs.writeFile(filePath, buffer);

  return filePath;
};
