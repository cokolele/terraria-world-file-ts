import { readFile } from 'node:fs/promises'

export async function fileLoader(path: string): Promise<ArrayBuffer> {
  const buf = await readFile(path)

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
}
