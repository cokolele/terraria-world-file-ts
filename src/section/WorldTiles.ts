import type { WorldProperties } from '../FileReader'
import type BinaryReader from '../BinaryReader'
import type BinarySaver from '../BinarySaver'
import { Section } from '../sections'

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

export type WorldTiles = typeof WorldTilesData

class WorldTilesData {
  public tiles!: Tile[][]
}

export default class WorldTilesIO implements Section.IO {
  public data!: WorldTilesData
  private RLE!: number

  public parse(reader: BinaryReader, world: WorldProperties): this {
    this.data = new WorldTilesData()
    this.RLE = 0

    this.data.tiles = new Array(world.width)

    for (let x = 0; x < world.width; x++) {
      this.data.tiles[x] = new Array(world.height)

      for (let y = 0; y < world.height; y++) {
        this.data.tiles[x][y] = this.parseTileData(reader, world)

        while (this.RLE) {
          this.data.tiles[x][y + 1] = this.data.tiles[x][y]
          y++
          this.RLE--
        }
      }
    }

    return this
  }
  public save(saver: BinarySaver, world: WorldProperties): number {
    const worldTilesCount = world.width * world.height

    for (let x = 0; x < world.width; x++) {
      for (let y = 0; y < world.height; ) {
        const tile = this.data.tiles[x][y]
        this.RLE = 0

        while (JSON.stringify(tile) === JSON.stringify(this.data.tiles[x][++y]) && y < world.height) {
          this.RLE++
        }

        this.saveTileData(saver, world, tile)

        if (
          saver.progressCallback &&
          ((x * world.height + y) / worldTilesCount) * 100 > saver.progress + 1 &&
          saver.progress != 100
        ) {
          saver.progressCallback(++saver.progress)
        }
      }
    }

    return saver.getPosition()
  }

  private parseTileData(reader: BinaryReader, world: WorldProperties): Tile {
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
        this.RLE = 0
        break
      case 64:
        this.RLE = reader.readUInt8()
        break
      case 128:
        this.RLE = reader.readInt16()
        break
    }

    return tile
  }

  private saveTileData(saver: BinarySaver, world: WorldProperties, tile: Tile): void {
    let flags1 = 0,
      flags2 = 0,
      flags3 = 0,
      flags4 = 0

    if (this.RLE) {
      flags1 |= this.RLE > 255 ? 128 : 64
    }

    if (typeof tile.blockId == 'number') {
      flags1 |= 2

      if (tile.blockId > 255) {
        flags1 |= 32
      }
    }

    if (tile.wallId) {
      flags1 |= 4

      if (tile.wallId > 255) {
        flags3 |= 64
      }
    }

    if (tile.liquidType) {
      switch (tile.liquidType) {
        case Liquid.Water:
          flags1 |= 8
          break
        case Liquid.Lava:
          flags1 |= 16
          break
        case Liquid.Honey:
          flags1 |= 24
          break
        case Liquid.Shimmer:
          flags1 |= 24
          flags3 |= 128
          break
      }
    }

    if (tile.slope) {
      switch (tile.slope) {
        case Slope.Half:
          flags2 |= 16
          break
        case Slope.TR:
          flags2 |= 32
          break
        case Slope.TL:
          flags2 |= 48
          break
        case Slope.BR:
          flags2 |= 64
          break
        case Slope.BL:
          flags2 |= 80
          break
      }
    }

    flags2 |= tile.wireRed ? 2 : 0
    flags2 |= tile.wireBlue ? 4 : 0
    flags2 |= tile.wireGreen ? 8 : 0
    flags3 |= tile.wireYellow ? 32 : 0
    flags3 |= tile.actuated ? 4 : 0
    flags3 |= tile.actuator ? 2 : 0
    flags3 |= tile.wallColor ? 16 : 0
    flags3 |= tile.blockColor ? 8 : 0
    flags4 |= tile.invisibleBlock ? 2 : 0
    flags4 |= tile.invisibleWall ? 4 : 0
    flags4 |= tile.fullBrightBlock ? 8 : 0
    flags4 |= tile.fullBrightWall ? 16 : 0

    if (flags4) {
      saver.saveUInt8(flags1 | 1)
      saver.saveUInt8(flags2 | 1)
      saver.saveUInt8(flags3 | 1)
    } else if (flags3) {
      saver.saveUInt8(flags1 | 1)
      saver.saveUInt8(flags2 | 1)
    } else if (flags2) {
      saver.saveUInt8(flags1 | 1)
    } else {
      saver.saveUInt8(flags1)
    }

    if (flags1 & 2) {
      if (flags1 & 32) {
        saver.saveUInt16(tile.blockId!)
      } else {
        saver.saveUInt8(tile.blockId!)
      }

      if (world.importants[tile.blockId!]) {
        saver.saveInt16(tile.frameX!)
        saver.saveInt16(tile.frameY!)
      }

      if (flags3 & 8) {
        saver.saveUInt8(tile.blockColor!)
      }
    }

    if (flags1 & 4) {
      saver.saveUInt8(tile.wallId! & 255)

      if (flags3 & 16) {
        saver.saveUInt8(tile.wallColor!)
      }
    }

    if (typeof tile.liquidAmount == 'number') {
      saver.saveUInt8(tile.liquidAmount)
    }

    if (flags3 & 64) {
      saver.saveUInt8(1)
    }

    if (this.RLE > 255) {
      saver.saveUInt16(this.RLE)
    } else {
      saver.saveUInt8(this.RLE)
    }
  }
}
