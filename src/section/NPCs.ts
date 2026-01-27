import type BinaryReader from '../BinaryReader'
import BinarySaver from '../BinarySaver'
import type { WorldProperties } from '../FileReader'
import type { Section } from '../sections'
import type { Pillar, TownNPC } from '../types'

export class NPCsData {
  townNPCs!: TownNPC[]
  pillars!: Pillar[]
}

export default class NPCsIO implements Section.IODefinition<NPCsData> {
  public parse(reader: BinaryReader, world: WorldProperties): NPCsData {
    const data = new NPCsData()

    const shimmeredNPCIds = world.version > 268 ? reader.readArray(reader.readInt32(), () => reader.readInt32()) : []

    data.townNPCs = reader.readArrayUntil(
      () => reader.readBoolean(),
      () => this.parseNPC(reader, world, shimmeredNPCIds),
    )

    data.pillars = reader.readArrayUntil(
      () => reader.readBoolean(),
      () => this.parsePillar(reader),
    )

    return data
  }

  private parseNPC(reader: BinaryReader, world: WorldProperties, shimmeredNPCIds: number[]) {
    const NPC: TownNPC = {
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

    if (world.version >= 315) {
      NPC.homelessDespawn = reader.readBoolean()
    }

    if (shimmeredNPCIds.includes(NPC.id)) {
      NPC.shimmered = true
    }

    return NPC
  }

  private parsePillar(reader: BinaryReader): Pillar {
    return {
      id: reader.readInt32(),
      position: {
        x: reader.readFloat32(),
        y: reader.readFloat32(),
      },
    }
  }

  public save(saver: BinarySaver, data: NPCsData, world: WorldProperties): void {
    saver.saveArray(
      data.townNPCs.filter((NPC) => NPC.shimmered),
      (length) => saver.saveInt32(length),
      (e) => saver.saveInt32(e.id),
    )

    data.townNPCs.forEach((NPC) => {
      saver.saveBoolean(true)
      saver.saveInt32(NPC.id)
      saver.saveString(NPC.name)
      saver.saveFloat32(NPC.position.x)
      saver.saveFloat32(NPC.position.y)
      saver.saveBoolean(NPC.homeless)
      saver.saveInt32(NPC.homePosition.x)
      saver.saveInt32(NPC.homePosition.y)

      if (world.version >= 225) {
        if (NPC.variationIndex !== undefined) {
          saver.saveUInt8(1)
          saver.saveInt32(NPC.variationIndex)
        } else {
          saver.saveUInt8(1)
        }
      }
    })
    saver.saveBoolean(false)

    data.pillars.forEach((NPC) => {
      saver.saveBoolean(true)
      saver.saveInt32(NPC.id)
      saver.saveFloat32(NPC.position.x)
      saver.saveFloat32(NPC.position.y)
    })
    saver.saveBoolean(false)
  }
}
