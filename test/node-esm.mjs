import { fileLoader } from 'terraria-world-file-ts/adapter'
import FileReader from 'terraria-world-file-ts'

async function test() {
  const reader = await new FileReader().loadFile(fileLoader, new URL('test.wld', import.meta.url))
  const data = reader.parse({
    sections: ['tileEntities'],
    ignorePointers: true,
  })

  console.log(data)
}

test()
