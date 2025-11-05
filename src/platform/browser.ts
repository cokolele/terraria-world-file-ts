// loadFile(file: File | Blob): Promise<this> {
//   return new Promise<this>((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       resolve(this.loadBuffer(reader.result as ArrayBuffer));
//     };

//     reader.onerror = () => {
//       reader.abort();
//       reject(reader.error);
//     };

//     reader.readAsArrayBuffer(file);
//   });
// }
//
// import { readFile } from 'node:fs/promises';

export async function fileLoader(path: string): Promise<ArrayBufferLike> {
  // const buf = await readFile(path);
  // return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

  return new Int32Array([4, 5, 6]).buffer
}
