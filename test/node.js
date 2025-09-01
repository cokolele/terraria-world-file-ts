import { loadFile } from "terraria-world-reader-ts-wasm/adapter";
import FileReader from "terraria-world-reader-ts-wasm";

async function test() {
  const buffer = await loadFile(new URL("test.wld", import.meta.url));
  const reader = new FileReader();
  reader.loadBuffer(buffer);

  console.log(reader.parseNecessaryData());
}

test();
