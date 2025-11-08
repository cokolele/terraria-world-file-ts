import { describe, expect, test } from 'vitest'
import BinaryReader from '../src/BinaryReader'
import { read } from 'fs'

const data = [1, 255, 3, 255, 4, 255, 5, 255, 6, 255, 7, 255, 8, 255, 9, 255]
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
  binaryReaderTest('Read data types', ({ reader }) => {
    expect(reader.readUInt8()).toEqual(1)
    expect(reader.readInt8()).toEqual(-1)
    expect(reader.readUInt16()).toEqual(65283)
    expect(reader.readInt16()).toEqual(-252)
    expect(reader.readUInt32()).toEqual(4278648581)
    expect(reader.readInt32()).toEqual(-16187641)

    reader.jumpTo(0)
    expect(reader.readUInt64()).toEqual(18376374251478580993n)
    expect(reader.readInt64()).toEqual(-69243905143996666n)

    reader.jumpTo(0)
    expect(reader.readFloat32()).toEqual(-1.7545292342915996e38)
    expect(reader.readFloat64()).toEqual(-8.227883321302187e303)

    reader.jumpTo(0)
    expect(reader.readBoolean()).toEqual(true)
    //prettier-ignore
    expect(reader.readBits(24)).toEqual([
      true,  true,  true, true, true, true,  true,  true,
      true, true, false, false, false, false, false, false,
      true,  true,  true, true, true, true,  true,  true,
    ])

    reader.jumpTo(0)
    expect(reader.readBytes(4)).toEqual(new Uint8Array(data.slice(0, 4)))
    expect(reader.readArray(4, () => reader.readUInt8())).toEqual(data.slice(4, 8))
    expect(
      reader.readArrayUntil(
        () => !reader.isFinished(),
        () => reader.readUInt8(),
      ),
    ).toEqual(data.slice(8))
    expect(reader.getPosition()).toEqual(data.length)

    reader.jumpTo(0)
    reader.loadBuffer(new Uint8Array([2, 72, 105]).buffer)
    expect(reader.readString()).toEqual('Hi')
  })
})
