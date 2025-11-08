import type BinaryReader from '../BinaryReader'

export default function parseFileFormatHeader(reader: BinaryReader) {
  return {
    version: reader.readInt32(),
    magicNumber: reader.readString(7) as 'relogic',
    fileType: reader.readUInt8() as 2,
    revision: reader.readUInt32(),
    favorite: Boolean(reader.readInt64()),
    pointers: reader.readArray(reader.readInt16(), () => reader.readInt32()),
    importants: reader.readBits(reader.readUInt16()),
  }
}
