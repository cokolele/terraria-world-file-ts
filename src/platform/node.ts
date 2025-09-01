import { readFile } from "node:fs/promises";

export async function loadFile(path: string): Promise<ArrayBufferLike> {
  const buf = await readFile(path);

  console.log("\n\t> Node.js loadFile\n");

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}
