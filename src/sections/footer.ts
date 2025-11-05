import type BinaryReader from '../BinaryReader'

export default function parseFooter(reader: BinaryReader) {
  return {
    signoff1: reader.readBoolean(),
    signoff2: reader.readString(),
    signoff3: reader.readInt32(),
  }
}
