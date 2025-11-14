import BinarySaver from './BinarySaver'
import { Section } from '../Sections'
import { saveFileFormatHeader } from '../section/fileFormatHeader'
import { WorldProperties } from '../reader/FileReader'

export default class FileSaver {
  private saver = new BinarySaver()

  private world = {} as Section.DataMap
  private progressCallback?: (percent: number) => void

  save(world: Section.DataMap, progressCallback?: (percent: number) => void): ArrayBuffer {
    this.world = world
    this.progressCallback = progressCallback

    const worldProperties: WorldProperties = {
      version: world.fileFormatHeader.version,
      pointers: world.fileFormatHeader.pointers,
      importants: world.fileFormatHeader.importants,
      height: world.header.maxTilesY,
      width: world.header.maxTilesX,
    }

    let pointers = [
      saveFileFormatHeader(this.saver, worldProperties, world.fileFormatHeader),
      this.saveHeader(),
      this.saveWorldTiles(),
      this.saveChests(),
      this.saveSigns(),
      this.saveNPCs(),
      this.saveTileEntities(),
      this.saveWeightedPressurePlates(),
      this.saveTownManager(),
      ...(this.world.fileFormatHeader.version >= 225 ? [this.saveBestiary(), this.saveCreativePowers()] : [0]),
    ]

    this.saveFooter()

    this.saver.jumpTo(24)
    this.saver.saveInt16(pointers.length)
    pointers.forEach((pointer) => this.saver.saveInt32(pointer))

    this.saver.trimEnd()
    return this.saver.getBuffer()
  }

  saveHeader() {
    const data = this.world.header

    this.saver.saveString(data.mapName)
    this.saver.saveString(data.seedText)
    this.saver.saveBytes(data.worldGeneratorVersion)
    this.saver.saveBytes(data.guid)
    this.saver.saveInt32(data.worldId)
    this.saver.saveInt32(data.leftWorld)
    this.saver.saveInt32(data.rightWorld)
    this.saver.saveInt32(data.topWorld)
    this.saver.saveInt32(data.bottomWorld)
    this.saver.saveInt32(data.maxTilesY)
    this.saver.saveInt32(data.maxTilesX)
    if (this.world.fileFormatHeader.version >= 225) {
      this.saver.saveInt32(data.gameMode)
      this.saver.saveBoolean(data.drunkWorld)

      if (this.world.fileFormatHeader.version >= 227) {
        this.saver.saveBoolean(data.getGoodWorld)
      }
      if (this.world.fileFormatHeader.version >= 238) {
        this.saver.saveBoolean(data.getTenthAnniversaryWorld)
      }
      if (this.world.fileFormatHeader.version >= 239) {
        this.saver.saveBoolean(data.dontStarveWorld)
      }
      if (this.world.fileFormatHeader.version >= 241) {
        this.saver.saveBoolean(data.notTheBeesWorld)
      }
      if (this.world.fileFormatHeader.version >= 249) {
        this.saver.saveBoolean(data.remixWorld)
      }
      if (this.world.fileFormatHeader.version >= 266) {
        this.saver.saveBoolean(data.noTrapsWorld)
      }
      if (this.world.fileFormatHeader.version >= 267) {
        this.saver.saveBoolean(data.zenithWorld)
      }
    } else {
      this.saver.saveBoolean(data.expertMode)
    }
    this.saver.saveBytes(data.creationTime)
    this.saver.saveUInt8(data.moonType)
    this.saver.saveInt32(data.treeX[0])
    this.saver.saveInt32(data.treeX[1])
    this.saver.saveInt32(data.treeX[2])
    this.saver.saveInt32(data.treeStyle[0])
    this.saver.saveInt32(data.treeStyle[1])
    this.saver.saveInt32(data.treeStyle[2])
    this.saver.saveInt32(data.treeStyle[3])
    this.saver.saveInt32(data.caveBackX[0])
    this.saver.saveInt32(data.caveBackX[1])
    this.saver.saveInt32(data.caveBackX[2])
    this.saver.saveInt32(data.caveBackStyle[0])
    this.saver.saveInt32(data.caveBackStyle[1])
    this.saver.saveInt32(data.caveBackStyle[2])
    this.saver.saveInt32(data.caveBackStyle[3])
    this.saver.saveInt32(data.iceBackStyle)
    this.saver.saveInt32(data.jungleBackStyle)
    this.saver.saveInt32(data.hellBackStyle)
    this.saver.saveInt32(data.spawnTileX)
    this.saver.saveInt32(data.spawnTileY)
    this.saver.saveFloat64(data.worldSurface)
    this.saver.saveFloat64(data.rockLayer)
    this.saver.saveFloat64(data.tempTime)
    this.saver.saveBoolean(data.tempDayTime)
    this.saver.saveInt32(data.tempMoonPhase)
    this.saver.saveBoolean(data.tempBloodMoon)
    this.saver.saveBoolean(data.tempEclipse)
    this.saver.saveInt32(data.dungeonX)
    this.saver.saveInt32(data.dungeonY)
    this.saver.saveBoolean(data.crimson)
    this.saver.saveBoolean(data.downedBoss1)
    this.saver.saveBoolean(data.downedBoss2)
    this.saver.saveBoolean(data.downedBoss3)
    this.saver.saveBoolean(data.downedQueenBee)
    this.saver.saveBoolean(data.downedMechBoss1)
    this.saver.saveBoolean(data.downedMechBoss2)
    this.saver.saveBoolean(data.downedMechBoss3)
    this.saver.saveBoolean(data.downedMechBossAny)
    this.saver.saveBoolean(data.downedPlantBoss)
    this.saver.saveBoolean(data.downedGolemBoss)
    this.saver.saveBoolean(data.downedSlimeKing)
    this.saver.saveBoolean(data.savedGoblin)
    this.saver.saveBoolean(data.savedWizard)
    this.saver.saveBoolean(data.savedMech)
    this.saver.saveBoolean(data.downedGoblins)
    this.saver.saveBoolean(data.downedClown)
    this.saver.saveBoolean(data.downedFrost)
    this.saver.saveBoolean(data.downedPirates)
    this.saver.saveBoolean(data.shadowOrbSmashed)
    this.saver.saveBoolean(data.spawnMeteor)
    this.saver.saveUInt8(data.shadowOrbCount)
    this.saver.saveInt32(data.altarCount)
    this.saver.saveBoolean(data.hardMode)
    if (this.world.fileFormatHeader.version >= 257) {
      this.saver.saveBoolean(data.afterPartyOfDoom)
    }
    this.saver.saveInt32(data.invasionDelay)
    this.saver.saveInt32(data.invasionSize)
    this.saver.saveInt32(data.invasionType)
    this.saver.saveFloat64(data.invasionX)
    this.saver.saveFloat64(data.slimeRainTime)
    this.saver.saveUInt8(data.sundialCooldown)
    this.saver.saveBoolean(data.tempRaining)
    this.saver.saveInt32(data.tempRainTime)
    this.saver.saveFloat32(data.tempMaxRain)
    this.saver.saveInt32(data.oreTier1)
    this.saver.saveInt32(data.oreTier2)
    this.saver.saveInt32(data.oreTier3)
    this.saver.saveUInt8(data.setBG0)
    this.saver.saveUInt8(data.setBG1)
    this.saver.saveUInt8(data.setBG2)
    this.saver.saveUInt8(data.setBG3)
    this.saver.saveUInt8(data.setBG4)
    this.saver.saveUInt8(data.setBG5)
    this.saver.saveUInt8(data.setBG6)
    this.saver.saveUInt8(data.setBG7)
    this.saver.saveInt32(data.cloudBGActive)
    this.saver.saveInt16(data.numClouds)
    this.saver.saveFloat32(data.windSpeed)
    this.saver.saveInt32(data.anglerWhoFinishedToday.length)
    data.anglerWhoFinishedToday.forEach((e) => this.saver.saveString(e))
    this.saver.saveBoolean(data.savedAngler)
    this.saver.saveInt32(data.anglerQuest)
    this.saver.saveBoolean(data.savedStylist)
    this.saver.saveBoolean(data.savedTaxCollector)
    if (this.world.fileFormatHeader.version >= 225) {
      this.saver.saveBoolean(data.savedGolfer)
    }
    this.saver.saveInt32(data.invasionSizeStart)
    this.saver.saveInt32(data.tempCultistDelay)
    this.saver.saveInt16(data.killCount.length)
    data.killCount.forEach((e) => this.saver.saveInt32(e))
    this.saver.saveBoolean(data.fastForwardTimeToDawn)
    this.saver.saveBoolean(data.downedFishron)
    this.saver.saveBoolean(data.downedMartians)
    this.saver.saveBoolean(data.downedAncientCultist)
    this.saver.saveBoolean(data.downedMoonlord)
    this.saver.saveBoolean(data.downedHalloweenKing)
    this.saver.saveBoolean(data.downedHalloweenTree)
    this.saver.saveBoolean(data.downedChristmasIceQueen)
    this.saver.saveBoolean(data.downedChristmasSantank)
    this.saver.saveBoolean(data.downedChristmasTree)
    this.saver.saveBoolean(data.downedTowerSolar)
    this.saver.saveBoolean(data.downedTowerVortex)
    this.saver.saveBoolean(data.downedTowerNebula)
    this.saver.saveBoolean(data.downedTowerStardust)
    this.saver.saveBoolean(data.TowerActiveSolar)
    this.saver.saveBoolean(data.TowerActiveVortex)
    this.saver.saveBoolean(data.TowerActiveNebula)
    this.saver.saveBoolean(data.TowerActiveStardust)
    this.saver.saveBoolean(data.LunarApocalypseIsUp)
    this.saver.saveBoolean(data.tempPartyManual)
    this.saver.saveBoolean(data.tempPartyGenuine)
    this.saver.saveInt32(data.tempPartyCooldown)
    this.saver.saveInt32(data.tempPartyCelebratingNPCs.length)
    data.tempPartyCelebratingNPCs.forEach((e) => this.saver.saveInt32(e))
    this.saver.saveBoolean(data.Temp_Sandstorm_Happening)
    this.saver.saveInt32(data.Temp_Sandstorm_TimeLeft)
    this.saver.saveFloat32(data.Temp_Sandstorm_Severity)
    this.saver.saveFloat32(data.Temp_Sandstorm_IntendedSeverity)
    this.saver.saveBoolean(data.savedBartender)
    this.saver.saveBoolean(data.DD2Event_DownedInvasionT1)
    this.saver.saveBoolean(data.DD2Event_DownedInvasionT2)
    this.saver.saveBoolean(data.DD2Event_DownedInvasionT3)

    if (this.world.fileFormatHeader.version >= 225) {
      this.saver.saveUInt8(data.setBG8)
      this.saver.saveUInt8(data.setBG9)
      this.saver.saveUInt8(data.setBG10)
      this.saver.saveUInt8(data.setBG11)
      this.saver.saveUInt8(data.setBG12)

      this.saver.saveBoolean(data.combatBookWasUsed)
      this.saver.saveInt32(data.lanternNightCooldown)
      this.saver.saveBoolean(data.lanternNightGenuine)
      this.saver.saveBoolean(data.lanternNightManual)
      this.saver.saveBoolean(data.lanternNightNextNightIsGenuine)

      this.saver.saveInt32(data.treeTopsVariations.length)
      data.treeTopsVariations.forEach((e) => this.saver.saveInt32(e))

      this.saver.saveBoolean(data.forceHalloweenForToday)
      this.saver.saveBoolean(data.forceXMasForToday)

      this.saver.saveInt32(data.savedOreTierCopper)
      this.saver.saveInt32(data.savedOreTierIron)
      this.saver.saveInt32(data.savedOreTierSilver)
      this.saver.saveInt32(data.savedOreTierGold)

      this.saver.saveBoolean(data.boughtCat)
      this.saver.saveBoolean(data.boughtDog)
      this.saver.saveBoolean(data.boughtBunny)

      this.saver.saveBoolean(data.downedEmpressOfLight)
      this.saver.saveBoolean(data.downedQueenSlime)
    }

    if (this.world.fileFormatHeader.version >= 240) {
      this.saver.saveBoolean(data.downedDeerclops)
    }

    if (this.world.fileFormatHeader.version >= 269) {
      this.saver.saveBoolean(data.unlockedSlimeBlueSpawn)
      this.saver.saveBoolean(data.unlockedMerchantSpawn)
      this.saver.saveBoolean(data.unlockedDemolitionistSpawn)
      this.saver.saveBoolean(data.unlockedPartyGirlSpawn)
      this.saver.saveBoolean(data.unlockedDyeTraderSpawn)
      this.saver.saveBoolean(data.unlockedTruffleSpawn)
      this.saver.saveBoolean(data.unlockedArmsDealerSpawn)
      this.saver.saveBoolean(data.unlockedNurseSpawn)
      this.saver.saveBoolean(data.unlockedPrincessSpawn)
      this.saver.saveBoolean(data.combatBookVolumeTwoWasUsed)
      this.saver.saveBoolean(data.peddlersSatchelWasUsed)
      this.saver.saveBoolean(data.unlockedSlimeGreenSpawn)
      this.saver.saveBoolean(data.unlockedSlimeOldSpawn)
      this.saver.saveBoolean(data.unlockedSlimePurpleSpawn)
      this.saver.saveBoolean(data.unlockedSlimeRainbowSpawn)
      this.saver.saveBoolean(data.unlockedSlimeRedSpawn)
      this.saver.saveBoolean(data.unlockedSlimeYellowSpawn)
      this.saver.saveBoolean(data.unlockedSlimeCopperSpawn)
      this.saver.saveBoolean(data.fastForwardTimeToDusk)
      this.saver.saveUInt8(data.moondialCooldown)
    }

    return this.saver.getPosition()
  }

  saveWorldTiles() {
    const data = this.world.tiles

    let onePercentSize, onePercentSizeNext, percent
    if (this.options.progressCallback) {
      onePercentSize = Math.floor(this.world.header.maxTilesX / 100)
      onePercentSizeNext = onePercentSize
      percent = 0
    }

    for (let x = 0; x < this.world.header.maxTilesX; x++) {
      if (this.options.progressCallback) {
        if (x >= onePercentSizeNext) {
          percent++
          onePercentSizeNext += onePercentSize
          this.options.progressCallback(percent)
        }
      }

      for (let y = 0; y < this.world.header.maxTilesY; ) {
        const tile = data[x][y]
        let flags1, flags2, flags3, flags4

        const startY = y
        do y++
        while (y < this.world.header.maxTilesY && JSON.stringify(tile) === JSON.stringify(data[x][y]))

        const RLE = y - startY - 1

        if (RLE) {
          if (RLE > 255) flags1 |= 128
          else flags1 |= 64
        }

        if (typeof tile.blockId == 'number') {
          flags1 |= 2

          if (tile.blockId > 255) flags1 |= 32
        }

        if (tile.wallId) {
          flags1 |= 4

          if (tile.wallId > 255) flags3 |= 64
        }

        if (tile.liquidType) {
          switch (tile.liquidType) {
            case 'water':
              flags1 |= 1 << 3
              break
            case 'lava':
              flags1 |= 2 << 3
              break
            case 'shimmer':
              flags3 |= 128
            case 'honey':
              flags1 |= 3 << 3
              break
          }
        }

        if (tile.slope) {
          switch (tile.slope) {
            case 'half':
              flags2 |= 1 << 4
              break
            case 'TR':
              flags2 |= 2 << 4
              break
            case 'TL':
              flags2 |= 3 << 4
              break
            case 'BR':
              flags2 |= 4 << 4
              break
            case 'BL':
              flags2 |= 5 << 4
              break
          }
        }

        if (tile.wireRed) flags2 |= 2

        if (tile.wireBlue) flags2 |= 4

        if (tile.wireGreen) flags2 |= 8

        if (tile.wireYellow) flags3 |= 32

        if (tile.actuated) flags3 |= 4

        if (tile.actuator) flags3 |= 2

        if (tile.wallColor) flags3 |= 16

        if (tile.blockColor) flags3 |= 8

        if (tile.invisibleBlock) flags4 |= 2

        if (tile.invisibleWall) flags4 |= 4

        if (tile.fullBrightBlock) flags4 |= 8

        if (tile.fullBrightWall) flags4 |= 16

        if (flags4) {
          this.saver.saveUInt8(flags1 | 1)
          this.saver.saveUInt8(flags2 | 1)
          this.saver.saveUInt8(flags3 | 1)
        } else if (flags3) {
          this.saver.saveUInt8(flags1 | 1)
          this.saver.saveUInt8(flags2 | 1)
        } else if (flags2) {
          this.saver.saveUInt8(flags1 | 1)
        } else {
          this.saver.saveUInt8(flags1)
        }

        if (flags1 & 2) {
          if (flags1 & 32) this.saver.saveUInt16(tile.blockId)
          else this.saver.saveUInt8(tile.blockId)

          if (this.world.fileFormatHeader.importants[tile.blockId]) {
            this.saver.saveInt16(tile.frameX)
            this.saver.saveInt16(tile.frameY)
          }

          if (flags3 & 8) this.saver.saveUInt8(tile.blockColor)
        }

        if (flags1 & 4) {
          this.saver.saveUInt8(tile.wallId & 255)

          if (flags3 & 16) this.saver.saveUInt8(tile.wallColor)
        }

        if (typeof tile.liquidAmount == 'number') this.saver.saveUInt8(tile.liquidAmount)

        if (flags3 & 64) this.saver.saveUInt8(1)

        if (RLE) {
          if (RLE > 255) this.saver.saveUInt16(RLE)
          else this.saver.saveUInt8(RLE)
        }
      }
    }

    return this.saver.getPosition()
  }

  saveChests() {
    const data = this.world.chests

    this.saver.saveInt16(data.length)
    this.saver.saveInt16(40)

    data.forEach((chest) => {
      this.saver.saveInt32(chest.position.x)
      this.saver.saveInt32(chest.position.y)
      if (chest.name) this.saver.saveString(chest.name)
      else this.saver.saveUInt8(0)

      const chestItems = Array(40).fill(null)
      if (chest.items) {
        chest.items.forEach((item, i) => {
          chestItems[i] = item
        })
      }

      chestItems.forEach((item) => {
        if (item === null) this.saver.saveInt16(0)
        else {
          this.saver.saveInt16(item.stack)
          this.saver.saveInt32(item.id)
          this.saver.saveUInt8(item.prefix)
        }
      })
    })

    return this.saver.getPosition()
  }

  saveSigns() {
    const data = this.world.signs

    this.saver.saveInt16(data.length)

    data.forEach((sign) => {
      this.saver.saveString(sign.text)
      this.saver.saveInt32(sign.position.x)
      this.saver.saveInt32(sign.position.y)
    })

    return this.saver.getPosition()
  }

  saveNPCs() {
    const data = this.world.NPCs

    const shimmeredNPCs = data.filter((NPC) => NPC.shimmered)
    this.saver.saveInt32(shimmeredNPCs.length)
    shimmeredNPCs.forEach((NPC) => this.saver.saveInt32(NPC.id))

    data.forEach((NPC) => {
      if (NPC.townNPC) {
        this.saver.saveBoolean(true)
        this.saver.saveInt32(NPC.id)
        this.saver.saveString(NPC.name)
        this.saver.saveFloat32(NPC.position.x)
        this.saver.saveFloat32(NPC.position.y)
        this.saver.saveBoolean(NPC.homeless)
        this.saver.saveInt32(NPC.homePosition.x)
        this.saver.saveInt32(NPC.homePosition.y)

        if (this.world.fileFormatHeader.version >= 225) {
          if (NPC.variationIndex !== undefined) {
            this.saver.saveBitsByte([true])
            this.saver.saveInt32(NPC.variationIndex)
          } else this.saver.saveBitsByte([false])
        }
      }
    })
    this.saver.saveBoolean(false)

    data.forEach((NPC) => {
      if (NPC.pillar) {
        this.saver.saveBoolean(true)
        this.saver.saveInt32(NPC.id)
        this.saver.saveFloat32(NPC.position.x)
        this.saver.saveFloat32(NPC.position.y)
      }
    })
    this.saver.saveBoolean(false)

    return this.saver.getPosition()
  }

  saveTileEntities() {
    const data = this.world.tileEntities

    this.saver.saveInt32(data.length)

    data.forEach((tileEntity) => {
      if (tileEntity.targetDummy) this.saver.saveUInt8(0)
      else if (tileEntity.itemFrame) this.saver.saveUInt8(1)
      else if (tileEntity.logicSensor) this.saver.saveUInt8(2)
      else if (tileEntity.displayDoll) this.saver.saveUInt8(3)
      else if (tileEntity.weaponsRack) this.saver.saveUInt8(4)
      else if (tileEntity.hatRack) this.saver.saveUInt8(5)
      else if (tileEntity.foodPlatter) this.saver.saveUInt8(6)
      else if (tileEntity.teleportationPylon) this.saver.saveUInt8(7)

      this.saver.saveInt32(tileEntity.id)
      this.saver.saveInt16(tileEntity.position.x)
      this.saver.saveInt16(tileEntity.position.y)

      if (tileEntity.targetDummy) {
        this.saver.saveInt16(tileEntity.targetDummy.npc)
      } else if (tileEntity.itemFrame) {
        this.saver.saveInt16(tileEntity.itemFrame.itemId)
        this.saver.saveUInt8(tileEntity.itemFrame.prefix)
        this.saver.saveInt16(tileEntity.itemFrame.stack)
      } else if (tileEntity.logicSensor) {
        this.saver.saveUInt8(tileEntity.logicSensor.logicCheck)
        this.saver.saveBoolean(tileEntity.logicSensor.on)
      } else if (tileEntity.displayDoll) {
        let itemsBits = [],
          dyesBits = []

        if (tileEntity.displayDoll.items)
          for (let i = 0; i < 8; i++) itemsBits[i] = tileEntity.displayDoll.items[i] ? true : false
        this.saver.saveBitsByte(itemsBits)

        if (tileEntity.displayDoll.dyes)
          for (let i = 0; i < 8; i++) dyesBits[i] = tileEntity.displayDoll.dyes[i] ? true : false
        this.saver.saveBitsByte(dyesBits)

        for (let j = 0; j < 8; j++)
          if (itemsBits[j]) {
            this.saver.saveInt16(tileEntity.displayDoll.items[j].itemId)
            this.saver.saveUInt8(tileEntity.displayDoll.items[j].prefix)
            this.saver.saveInt16(tileEntity.displayDoll.items[j].stack)
          }

        for (let j = 0; j < 8; j++)
          if (dyesBits[j]) {
            this.saver.saveInt16(tileEntity.displayDoll.dyes[j].itemId)
            this.saver.saveUInt8(tileEntity.displayDoll.dyes[j].prefix)
            this.saver.saveInt16(tileEntity.displayDoll.dyes[j].stack)
          }
      } else if (tileEntity.weaponsRack) {
        this.saver.saveInt16(tileEntity.weaponsRack.itemId)
        this.saver.saveUInt8(tileEntity.weaponsRack.prefix)
        this.saver.saveInt16(tileEntity.weaponsRack.stack)
      } else if (tileEntity.hatRack) {
        let itemsBits = [],
          dyesBits = []

        if (tileEntity.hatRack.items)
          for (let i = 0; i < 2; i++) itemsBits[i] = tileEntity.hatRack.items[i] ? true : false

        if (tileEntity.hatRack.dyes) for (let i = 0; i < 2; i++) dyesBits[i] = tileEntity.hatRack.dyes[i] ? true : false

        this.saver.saveBitsByte([...itemsBits, ...dyesBits])

        for (let j = 0; j < 2; j++)
          if (itemsBits[j]) {
            this.saver.saveInt16(tileEntity.hatRack.items[j].itemId)
            this.saver.saveUInt8(tileEntity.hatRack.items[j].prefix)
            this.saver.saveInt16(tileEntity.hatRack.items[j].stack)
          }

        for (let j = 0; j < 2; j++)
          if (dyesBits[j]) {
            this.saver.saveInt16(tileEntity.hatRack.dyes[j].itemId)
            this.saver.saveUInt8(tileEntity.hatRack.dyes[j].prefix)
            this.saver.saveInt16(tileEntity.hatRack.dyes[j].stack)
          }
      } else if (tileEntity.foodPlatter) {
        this.saver.saveInt16(tileEntity.foodPlatter.itemId)
        this.saver.saveUInt8(tileEntity.foodPlatter.prefix)
        this.saver.saveInt16(tileEntity.foodPlatter.stack)
      }
    })

    return this.saver.getPosition()
  }

  saveWeightedPressurePlates() {
    const data = this.world.weightedPressurePlates

    this.saver.saveInt32(data.length)

    data.forEach((pressurePlate) => {
      this.saver.saveInt32(pressurePlate.position.x)
      this.saver.saveInt32(pressurePlate.position.y)
    })

    return this.saver.getPosition()
  }

  saveTownManager() {
    const data = this.world.rooms

    this.saver.saveInt32(data.length)

    data.forEach((room) => {
      this.saver.saveInt32(room.NPCId)
      this.saver.saveInt32(room.position.x)
      this.saver.saveInt32(room.position.y)
    })

    return this.saver.getPosition()
  }

  saveBestiary() {
    const data = this.world.bestiary

    data.NPCKills = Object.entries(data.NPCKills)

    this.saver.saveInt32(data.NPCKills.length)
    for (let i = 0; i < data.NPCKills.length; i++) {
      this.saver.saveString(data.NPCKills[i][0])
      this.saver.saveInt32(data.NPCKills[i][1])
    }

    this.saver.saveInt32(data.NPCSights.length)
    for (let i = 0; i < data.NPCSights.length; i++) this.saver.saveString(data.NPCSights[i])

    this.saver.saveInt32(data.NPCChats.length)
    for (let i = 0; i < data.NPCChats.length; i++) this.saver.saveString(data.NPCChats[i])

    return this.saver.getPosition()
  }

  saveCreativePowers() {
    const creativePowers = this.world.creativePowers

    this.saver.saveBoolean(true)
    this.saver.saveInt16(0)
    this.saver.saveBoolean(creativePowers.freezeTime)

    this.saver.saveBoolean(true)
    this.saver.saveInt16(8)
    this.saver.saveFloat32(creativePowers.modifyTimeRate)

    this.saver.saveBoolean(true)
    this.saver.saveInt16(9)
    this.saver.saveBoolean(creativePowers.freezeRainPower)

    this.saver.saveBoolean(true)
    this.saver.saveInt16(10)
    this.saver.saveBoolean(creativePowers.freezeWindDirectionAndStrength)

    this.saver.saveBoolean(true)
    this.saver.saveInt16(12)
    this.saver.saveFloat32(creativePowers.difficultySliderPower)

    this.saver.saveBoolean(true)
    this.saver.saveInt16(13)
    this.saver.saveBoolean(creativePowers.stopBiomeSpreadPower)

    this.saver.saveBoolean(false)

    return this.saver.getPosition()
  }

  saveFooter() {
    this.saver.saveBoolean(true)
    this.saver.saveString(this.world.header.mapName)
    this.saver.saveInt32(this.world.header.worldId)
  }
}
