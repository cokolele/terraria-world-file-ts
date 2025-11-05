import type BinaryReader from '../BinaryReader'

export type WeightedPressurePlate = {
  position: {
    x: number
    y: number
  }
}
export default function parseWeightedPressurePlates(reader: BinaryReader) {
  return reader.readArray(reader.readInt32(), () => parseWeightedPressurePlate(reader))
}

function parseWeightedPressurePlate(reader: BinaryReader): WeightedPressurePlate {
  return {
    position: {
      x: reader.readInt32(),
      y: reader.readInt32(),
    },
  }
}
