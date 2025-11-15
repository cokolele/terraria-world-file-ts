import type BinaryReader from '../BinaryReader'
import type { WorldProperties } from '../FileReader'

export interface Pillar {
  id: number
  position: {
    x: number
    y: number
  }
}

export interface NPC extends Pillar {
  name: string
  homeless: boolean
  homePosition: {
    x: number
    y: number
  }
  variationIndex?: number
  shimmered?: boolean
}

export default function parseNPCs(reader: BinaryReader, world: WorldProperties): (NPC | Pillar)[] {
  const shimmeredNPCIds = world.version > 268 ? reader.readArray(reader.readInt32(), () => reader.readInt32()) : []

  const townNPCs = reader.readArrayUntil(
    () => reader.readBoolean(),
    () => parseNPC(reader, world, shimmeredNPCIds),
  )

  const pillars = reader.readArrayUntil(
    () => reader.readBoolean(),
    () => parsePillar(reader),
  )

  return [...townNPCs, ...pillars]
}

function parseNPC(reader: BinaryReader, world: WorldProperties, shimmeredNPCIds: number[]) {
  const NPC: NPC = {
    id: reader.readInt32(),
    name: reader.readString(),
    position: {
      x: reader.readFloat32(),
      y: reader.readFloat32(),
    },
    homeless: reader.readBoolean(),
    homePosition: {
      x: reader.readInt32(),
      y: reader.readInt32(),
    },
  }

  if (world.version >= 225 && reader.readBits(1)[0]) {
    NPC.variationIndex = reader.readInt32()
  }

  if (shimmeredNPCIds.includes(NPC.id)) {
    NPC.shimmered = true
  }

  return NPC
}

function parsePillar(reader: BinaryReader): Pillar {
  return {
    id: reader.readInt32(),
    position: {
      x: reader.readFloat32(),
      y: reader.readFloat32(),
    },
  }
}
