const { loadFile } = require('terraria-world-reader-ts-wasm/adapter');
const FileReader = require('terraria-world-reader-ts-wasm');

async function test() {
    const buffer = await loadFile(__dirname + '/test.wld');
    const reader = new FileReader();
    reader.loadBuffer(buffer);

    console.log(reader.parseNecessaryData());
}

test();
