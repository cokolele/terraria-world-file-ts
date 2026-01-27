import type BinaryReader from '../BinaryReader'
import {
  DisplayDoll,
  FoodPlatter,
  HatRack,
  Item,
  ItemFrame,
  ItemSlot,
  LogicSensor,
  Pylon,
  TileEntity,
  TileEntityBase,
  TileEntityType,
  TrainingDummy,
  WeaponsRack,
} from '../types'
import type { Section } from '../sections'
import type { WorldProperties } from '../FileReader'
import type BinarySaver from '../BinarySaver'

export class TileEntitiesData {
  entities!: TileEntity[]
}

export default class TileEntitiesIO implements Section.IODefinition<TileEntitiesData> {
  public parse(reader: BinaryReader, world: WorldProperties): TileEntitiesData {
    const data = new TileEntitiesData()

    data.entities = reader.readArray(reader.readInt32(), () => this.parseEntity(reader, world))

    return data
  }

  private parseEntity(reader: BinaryReader, world: WorldProperties): TileEntity {
    const entity: TileEntityBase = {
      type: reader.readUInt8() as TileEntityType,
      id: reader.readInt32(),
      position: {
        x: reader.readInt16(),
        y: reader.readInt16(),
      },
    }

    switch (entity.type) {
      case TileEntityType.TrainingDummy:
        return this.parseTrainingDummy(reader, entity)
      case TileEntityType.ItemFrame:
        return this.parseItemFrame(reader, entity)
      case TileEntityType.LogicSensor:
        return this.parseLogicSensor(reader, entity)
      case TileEntityType.DisplayDoll:
        return this.parseDisplayDoll(reader, entity, world)
      case TileEntityType.WeaponsRack:
        return this.parseWeaponsRack(reader, entity)
      case TileEntityType.HatRack:
        return this.parseHatRack(reader, entity)
      case TileEntityType.FoodPlatter:
        return this.parseFoodPlatter(reader, entity)
      case TileEntityType.Pylon:
        return entity as Pylon
    }
  }

  private parseTrainingDummy(reader: BinaryReader, entity: TileEntityBase): TrainingDummy {
    return {
      ...entity,
      type: TileEntityType.TrainingDummy,
      npc: reader.readInt16(),
    }
  }

  private parseItemFrame(reader: BinaryReader, entity: TileEntityBase): ItemFrame {
    return {
      ...entity,
      type: TileEntityType.ItemFrame,
      item: this.parseItem(reader),
    }
  }

  private parseLogicSensor(reader: BinaryReader, entity: TileEntityBase): LogicSensor {
    return {
      ...entity,
      type: TileEntityType.LogicSensor,
      logicCheck: reader.readUInt8(),
      on: reader.readBoolean(),
    }
  }

  private parseDisplayDoll(reader: BinaryReader, entity: TileEntityBase, world: WorldProperties): DisplayDoll {
    const items = reader.readBits(8),
      dyes = reader.readBits(8)

    if (world.version >= 307) {
      reader.readInt8()
    }

    if (world.version >= 308) {
      reader.readInt8()
    }

    return {
      ...entity,
      type: TileEntityType.DisplayDoll,
      items: items.map((bit): ItemSlot => (bit ? this.parseItem(reader) : null)),
      dyes: dyes.map((bit): ItemSlot => (bit ? this.parseItem(reader) : null)),
    }
  }

  private parseWeaponsRack(reader: BinaryReader, entity: TileEntityBase): WeaponsRack {
    return {
      ...entity,
      type: TileEntityType.WeaponsRack,
      item: this.parseItem(reader),
    }
  }

  private parseHatRack(reader: BinaryReader, entity: TileEntityBase): HatRack {
    const items = reader.readBits(8),
      dyes = reader.readBits(8)

    return {
      ...entity,
      type: TileEntityType.HatRack,
      items: items.map((bit): ItemSlot => (bit ? this.parseItem(reader) : null)),
      dyes: dyes.map((bit): ItemSlot => (bit ? this.parseItem(reader) : null)),
    }
  }

  private parseFoodPlatter(reader: BinaryReader, entity: TileEntityBase): FoodPlatter {
    return {
      ...entity,
      type: TileEntityType.FoodPlatter,
      item: this.parseItem(reader),
    }
  }

  private parseItem(reader: BinaryReader): Item {
    return {
      id: reader.readInt16(),
      prefix: reader.readUInt8(),
      stack: reader.readInt16(),
    }
  }

  public save(saver: BinarySaver, data: TileEntitiesData, world: WorldProperties): void {
    saver.saveArray(
      data.entities,
      (length) => saver.saveInt32(length),
      (entity) => this.saveTileEntity(saver, entity),
    )
  }

  private saveTileEntity(saver: BinarySaver, entity: TileEntity) {
    saver.saveUInt8(entity.type)
    saver.saveInt32(entity.id)
    saver.saveInt16(entity.position.x)
    saver.saveInt16(entity.position.y)

    switch (entity.type) {
      case TileEntityType.TrainingDummy:
        saver.saveInt16(entity.npc)
        break
      case TileEntityType.ItemFrame:
      case TileEntityType.WeaponsRack:
      case TileEntityType.FoodPlatter:
        this.saveItem(saver, entity.item)
        break
      case TileEntityType.LogicSensor:
        saver.saveUInt8(entity.logicCheck)
        saver.saveBoolean(entity.on)
        break
      case TileEntityType.DisplayDoll:
      case TileEntityType.HatRack:
        saver.saveBits(entity.items.map((itemSlot) => itemSlot !== null))
        saver.saveBits(entity.dyes.map((itemSlot) => itemSlot !== null))
        saver.saveArray(entity.items, null, (itemSlot) => this.saveItem(saver, itemSlot))
        saver.saveArray(entity.dyes, null, (itemSlot) => this.saveItem(saver, itemSlot))
        break
    }
  }

  private saveItem(saver: BinarySaver, item: ItemSlot) {
    if (item !== null) {
      saver.saveInt16(item.id)
      saver.saveUInt8(item.prefix)
      saver.saveInt16(item.stack)
    }
  }
}
