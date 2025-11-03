const { loadFile } = require('terraria-world-file-ts/adapter');
const FileReader = require('terraria-world-file-ts');

async function test() {
    const buffer = await loadFile(__dirname + '/test.wld');
    const reader = new FileReader();
    reader.loadBuffer(buffer);

    console.log(reader.parseNecessaryData());
}

test();
