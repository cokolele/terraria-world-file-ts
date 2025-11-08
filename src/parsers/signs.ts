import type BinaryReader from '../BinaryReader'

export type Sign = {
  text: string
  position: {
    x: number
    y: number
  }
}
export default function parseSigns(reader: BinaryReader) {
  return reader.readArray(reader.readInt16(), () => parseSign(reader))
}

function parseSign(reader: BinaryReader): Sign {
  return {
    text: reader.readString(),
    position: {
      x: reader.readInt32(),
      y: reader.readInt32(),
    },
  }
}
