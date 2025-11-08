import type BinaryReader from '../BinaryReader'

export enum CreativePowerType {
  FreezeTime,
  StartDayImmediately,
  StartNoonImmediately,
  StartNightImmediately,
  StartMidnightImmediately,
  GodModePower,
  ModifyWindDirectionAndStrength,
  ModifyRainPower,
  ModifyTimeRate,
  FreezeRainPower,
  FreezeWindDirectionAndStrength,
  FarPlacementRangePower,
  DifficultySliderPower,
  StopBiomeSpreadPower,
  SpawnRateSliderPerPlayerPower,
}

export default function parseCreativePowers(reader: BinaryReader) {
  return Object.fromEntries(
    reader.readArrayUntil(
      () => reader.readBoolean(),
      () => parseCreativePower(reader),
    ),
  )
}

function parseCreativePower(reader: BinaryReader): [string, number | boolean] {
  let type = reader.readUInt16(),
    typeName = CreativePowerType[type]

  switch (type) {
    case CreativePowerType.FreezeTime:
      return [typeName, reader.readBoolean()]
    case CreativePowerType.ModifyTimeRate:
      return [typeName, reader.readFloat32()]
    case CreativePowerType.FreezeRainPower:
      return [typeName, reader.readBoolean()]
    case CreativePowerType.FreezeWindDirectionAndStrength:
      return [typeName, reader.readBoolean()]
    case CreativePowerType.DifficultySliderPower:
      return [typeName, reader.readFloat32()]
    case CreativePowerType.StopBiomeSpreadPower:
      return [typeName, reader.readBoolean()]
    default:
      return ['unknown', 0]
  }
}
