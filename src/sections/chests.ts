import type BinaryReader from '../BinaryReader'

export type Chest = {
  position: {
    x: number
    y: number
  }
  name?: string
  items?: Item[]
}

export type Item = {
  stack: number
  id: number
  prefix: number
}

export default function parseChests(reader: BinaryReader) {
  return reader.readArray(reader.readInt32() & 0xffff, () => parseChest(reader))
}

function parseChest(reader: BinaryReader): Chest {
  const data: Chest = {
    position: {
      x: reader.readInt32(),
      y: reader.readInt32(),
    },
    name: reader.readString(),
    items: reader.readArray(40, () => parseItem(reader)).filter((item) => item.stack),
  }

  if (!data.name) {
    delete data.name
  }

  if (!data.items) {
    delete data.items
  }

  return data
}

function parseItem(reader: BinaryReader): Item {
  const stack = reader.readInt16()

  return {
    stack,
    id: Number(stack && reader.readInt32()),
    prefix: Number(stack && reader.readUInt8()),
  }
}
