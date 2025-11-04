import type BinaryReader from '../BinaryReader'
import type { Item, ItemSlot } from './chests'

export interface TileEntity {
  type: TileEntityType
  id: number
  position: {
    x: number
    y: number
  }
}

export interface TrainingDummy extends TileEntity {
  trainingDummy: {
    npc: number
  }
}

export interface ItemFrame extends TileEntity {
  itemFrame: Item
}

export interface LogicSensor extends TileEntity {
  logicSensor: {
    logicCheck: number
    on: boolean
  }
}

export interface DisplayDoll extends TileEntity {
  displayDoll: {
    items?: ItemSlot[]
    dyes?: ItemSlot[]
  }
}

export enum DisplayDollSlot {
  Armor_Head,
  Armor_Shirt,
  Armor_Legs,
  Acc_1,
  Acc_2,
  Acc_3,
  Acc_4,
  Acc_5,
}

export interface WeaponsRack extends TileEntity {
  weaponsRack: Item
}

export interface HatRack extends TileEntity {
  hatRack: {
    items?: ItemSlot[]
    dyes?: ItemSlot[]
  }
}

export enum HatRackSlot {
  LeftHat,
  RightHat,
}

export interface FoodPlatter extends TileEntity {
  foodPlatter: Item
}

export interface Pylon extends TileEntity {}

export enum TileEntityType {
  TrainingDummy,
  ItemFrame,
  LogicSensor,
  DisplayDoll,
  WeaponsRack,
  HatRack,
  FoodPlatter,
  Pylon,
}

export default function parseTileEntities(reader: BinaryReader) {
  return reader.readArray(reader.readInt32(), () => parseEntity(reader))
}

function parseEntity(reader: BinaryReader) {
  const entity: TileEntity = {
    type: reader.readUInt8() as TileEntityType,
    id: reader.readInt32(),
    position: {
      x: reader.readInt16(),
      y: reader.readInt16(),
    },
  }

  switch (entity.type) {
    case TileEntityType.TrainingDummy:
      return { ...entity, ...parseTrainingDummy(reader) } as TrainingDummy
    case TileEntityType.ItemFrame:
      return { ...entity, ...parseItemFrame(reader) } as ItemFrame
    case TileEntityType.LogicSensor:
      return { ...entity, ...parseLogicSensor(reader) } as LogicSensor
    case TileEntityType.DisplayDoll:
      return { ...entity, ...parseDisplayDoll(reader) } as DisplayDoll
    case TileEntityType.WeaponsRack:
      return { ...entity, ...parseWeaponsRack(reader) } as WeaponsRack
    case TileEntityType.HatRack:
      return { ...entity, ...parseHatRack(reader) } as HatRack
    case TileEntityType.FoodPlatter:
      return { ...entity, ...parseFoodPlatter(reader) } as FoodPlatter
    case TileEntityType.Pylon:
      return entity as Pylon
    default:
      return entity
  }
}

function parseTrainingDummy(reader: BinaryReader): Partial<TrainingDummy> {
  return {
    trainingDummy: {
      npc: reader.readInt16(),
    },
  }
}

function parseItemFrame(reader: BinaryReader): Partial<ItemFrame> {
  return {
    itemFrame: parseItem(reader),
  }
}

function parseLogicSensor(reader: BinaryReader): Partial<LogicSensor> {
  return {
    logicSensor: {
      logicCheck: reader.readUInt8(),
      on: reader.readBoolean(),
    },
  }
}

function parseDisplayDoll(reader: BinaryReader): Partial<DisplayDoll> {
  const items = reader.readBits(8),
    dyes = reader.readBits(8)

  return {
    displayDoll: {
      items: items.map((bit): ItemSlot => (bit ? parseItem(reader) : null)),
      dyes: dyes.map((bit): ItemSlot => (bit ? parseItem(reader) : null)),
    },
  }
}

function parseWeaponsRack(reader: BinaryReader): Partial<WeaponsRack> {
  return {
    weaponsRack: parseItem(reader),
  }
}

function parseHatRack(reader: BinaryReader): Partial<HatRack> {
  const items = reader.readBits(8),
    dyes = reader.readBits(8)

  return {
    hatRack: {
      items: items.map((bit): ItemSlot => (bit ? parseItem(reader) : null)),
      dyes: dyes.map((bit): ItemSlot => (bit ? parseItem(reader) : null)),
    },
  }
}

function parseFoodPlatter(reader: BinaryReader): Partial<FoodPlatter> {
  return {
    foodPlatter: parseItem(reader),
  }
}

function parseItem(reader: BinaryReader): Item {
  return {
    id: reader.readInt16(),
    prefix: reader.readUInt8(),
    stack: reader.readInt16(),
  }
}
