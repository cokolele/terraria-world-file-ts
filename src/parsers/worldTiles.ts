import type { WorldProperties } from '../FileReader'
import type BinaryReader from '../BinaryReader'

export type Tile = {
  blockId?: number
  frameX?: number
  frameY?: number
  blockColor?: number
  wallId?: number
  wallColor?: number
  liquidAmount?: number
  liquidType?: Liquid
  wireRed?: boolean
  wireBlue?: boolean
  wireGreen?: boolean
  slope?: Slope
  actuator?: boolean
  actuated?: boolean
  wireYellow?: boolean
  invisibleBlock?: boolean
  invisibleWall?: boolean
  fullBrightBlock?: boolean
  fullBrightWall?: boolean
}

export enum Slope {
  Half = 1,
  TR,
  TL,
  BR,
  BL,
}

export enum Liquid {
  Water = 1,
  Lava,
  Honey,
  Shimmer,
}

let RLE = 0

export default function parseWorldTiles(reader: BinaryReader, world: WorldProperties): Tile[][] {
  let data = new Array(world.width)

  for (let x = 0; x < world.width; x++) {
    data[x] = new Array(world.height)

    for (let y = 0; y < world.height; y++) {
      data[x][y] = parseTileData(reader, world)

      while (RLE) {
        data[x][y + 1] = data[x][y]
        y++
        RLE--
      }
    }
  }

  return data
}

function parseTileData(reader: BinaryReader, world: WorldProperties) {
  let tile: Tile = {}

  const flags1 = reader.readUInt8()
  let flags2 = 0,
    flags3 = 0,
    flags4 = 0

  if (flags1 & 1) {
    flags2 = reader.readUInt8()

    if (flags2 & 1) {
      flags3 = reader.readUInt8()

      if (flags3 & 1) {
        flags4 = reader.readUInt8()
      }
    }
  }

  if (flags1 > 1) {
    if (flags1 & 2) {
      if (flags1 & 32) {
        tile.blockId = reader.readUInt16()
      } else {
        tile.blockId = reader.readUInt8()
      }

      if (world.importants[tile.blockId]) {
        tile.frameX = reader.readInt16()
        tile.frameY = reader.readInt16()
        if (tile.blockId == 144) {
          tile.frameY = 0
        }
      }

      if (flags3 & 8) {
        tile.blockColor = reader.readUInt8()
      }
    }

    if (flags1 & 4) {
      tile.wallId = reader.readUInt8()

      if (flags3 & 16) {
        tile.wallColor = reader.readUInt8()
      }
    }

    const liquidType = (flags1 & 24) >> 3
    if (liquidType) {
      tile.liquidAmount = reader.readUInt8()

      if (flags3 & 128) {
        tile.liquidType = Liquid.Shimmer
      } else {
        tile.liquidType = liquidType as Liquid
      }
    }
  }

  if (flags2) {
    if (flags2 & 2) {
      tile.wireRed = true
    }

    if (flags2 & 4) {
      tile.wireBlue = true
    }

    if (flags2 & 8) {
      tile.wireGreen = true
    }

    const slope = (flags2 & 112) >> 4
    if (slope) {
      tile.slope = slope as Slope
    }

    if (flags3) {
      if (flags3 & 2) {
        tile.actuator = true
      }

      if (flags3 & 4) {
        tile.actuated = true
      }

      if (flags3 & 32) {
        tile.wireYellow = true
      }

      if (flags3 & 64) {
        tile.wallId = (reader.readUInt8() << 8) | (tile.wallId || 0)
      }

      if (flags4) {
        if (flags4 & 2) {
          tile.invisibleBlock = true
        }

        if (flags4 & 4) {
          tile.invisibleWall = true
        }

        if (flags4 & 8) {
          tile.fullBrightBlock = true
        }

        if (flags4 & 16) {
          tile.fullBrightWall = true
        }
      }
    }
  }

  switch (flags1 & 192) {
    case 0:
      RLE = 0
      break
    case 64:
      RLE = reader.readUInt8()
      break
    case 128:
      RLE = reader.readInt16()
      break
  }

  return tile
}
