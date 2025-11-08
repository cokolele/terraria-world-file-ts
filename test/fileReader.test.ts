import { describe, expect, test } from 'vitest'
import { fileLoader } from '../src/platform/node'
import FileReader from '../src'

const testFilePath = import.meta.dirname + '/test.wld'

const fileReaderTest = test.extend<{ reader: FileReader }>({
  reader: async ({}, use) => {
    await use(await new FileReader().loadFile(fileLoader, testFilePath))
  },
})

describe.concurrent('Terraria World file reader', () => {
  test('Node buffer loading', async () => {
    const buffer = await fileLoader(testFilePath)
    await expect(fileLoader(testFilePath)).resolves.toBeInstanceOf(ArrayBuffer)
    await expect(new FileReader().loadBuffer(buffer)).resolves.toBeInstanceOf(FileReader)
  })

  test('Node file loading', async () => {
    await expect(new FileReader().loadFile(fileLoader, testFilePath)).resolves.toBeInstanceOf(FileReader)
  })

  fileReaderTest('Preflight', async ({ reader }) => {
    expect(reader.parse({ sections: [] })).toEqual({})
  })

  fileReaderTest('fileFormatHeader', async ({ reader }) => {
    expect(reader.parse({ sections: ['fileFormatHeader'] }).fileFormatHeader.magicNumber).toEqual('relogic')
    //@ts-ignore
    expect(reader.parse({ sections: ['fileFormatHeader'] }).header).toBeUndefined()
  })
})
