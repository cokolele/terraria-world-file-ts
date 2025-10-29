import { fileLoader } from 'terraria-world-reader-ts-wasm/adapter';
import FileReader from 'terraria-world-reader-ts-wasm';

async function test() {
  const reader = await new FileReader().loadFile(fileLoader, new URL('test.wld', import.meta.url));

  console.log(reader.parse());
}

test();
