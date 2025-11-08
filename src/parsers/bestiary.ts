import type BinaryReader from '../BinaryReader'

export type Bestiary = {
  NPCKills: { [k: string]: number }
  NPCSights: { [k: number]: string }
  NPCChats: { [k: number]: string }
}
export default function parseBestiary(reader: BinaryReader): Bestiary {
  return {
    NPCKills: Object.fromEntries(reader.readArray(reader.readInt32(), () => [reader.readString(), reader.readInt32()])),
    NPCSights: reader.readArray(reader.readInt32(), () => reader.readString()),
    NPCChats: reader.readArray(reader.readInt32(), () => reader.readString()),
  }
}
