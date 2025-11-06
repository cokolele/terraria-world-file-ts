import { describe, expect, test } from 'vitest'
import BinaryReader from '../src/BinaryReader'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const binaryReader = new BinaryReader()

const binaryReaderTest = test.extend<{ reader: BinaryReader }>({
  reader: async ({}, use) => {
    binaryReader.loadBuffer(new Uint8Array(data).buffer)
    binaryReader.ignoreBounds = false
    binaryReader.progressCallback = undefined
    binaryReader.jumpTo(0)
    await use(binaryReader)
  },
})

describe.concurrent('Terraria World File binary reader class', () => {
  binaryReaderTest('Read array of bytes', ({ reader }) => {
    expect(reader.readArray(data.length, () => reader.readUInt8())).toEqual(data)
  })
})
