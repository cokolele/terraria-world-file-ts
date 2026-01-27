import type BinaryReader from '../BinaryReader'
import type BinarySaver from '../BinarySaver'
import type { WorldProperties } from '../FileReader'
import type { Section } from '../sections'
import type { Chest, Item } from '../types'

export class ChestsData {
  public chests!: Chest[]
}

export default class ChestsIO implements Section.IODefinition<ChestsData> {
  parse(reader: BinaryReader, world: WorldProperties): ChestsData {
    const data = new ChestsData()

    data.chests = reader.readArray(world.version < 294 ? reader.readInt32() & 0xffff : reader.readInt16(), () =>
      this.parseChest(reader, world),
    )

    return data
  }

  private parseChest(reader: BinaryReader, world: WorldProperties): Chest {
    const data: Chest = {
      position: {
        x: reader.readInt32(),
        y: reader.readInt32(),
      },
      name: reader.readString(),
    }

    let chestSize = 40

    if (world.version >= 294) {
      chestSize = reader.readInt32()
    }

    data.items = reader.readArray(chestSize, () => this.parseItem(reader)).map((item) => (item.stack ? item : null))

    if (!data.name) {
      delete data.name
    }

    if (!data.items) {
      delete data.items
    }

    return data
  }

  private parseItem(reader: BinaryReader): Item {
    const stack = reader.readInt16()

    return {
      stack,
      id: Number(stack && reader.readInt32()),
      prefix: Number(stack && reader.readUInt8()),
    }
  }

  save(saver: BinarySaver, data: ChestsData, world: WorldProperties): void {
    saver.saveInt16(data.chests.length)
    saver.saveInt16(40)

    data.chests.forEach((chest) => {
      saver.saveInt32(chest.position.x)
      saver.saveInt32(chest.position.y)

      if (chest.name) {
        saver.saveString(chest.name)
      } else {
        saver.saveUInt8(0)
      }

      chest.items?.forEach((item) => {
        if (item == null) {
          saver.saveInt16(0)
        } else {
          saver.saveInt16(item.stack)
          saver.saveInt32(item.id)
          saver.saveUInt8(item.prefix)
        }
      })
    })
  }
}
