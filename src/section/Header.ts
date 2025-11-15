import type BinaryReader from '../BinaryReader'
import type { WorldProperties } from '../FileReader'
import type BinarySaver from '../BinarySaver'
import type { Section } from '../sections'

export enum GameMode {
  NormalMode,
  ExpertMode,
  MasterMode,
  CreativeMode,
}

export type Header = typeof HeaderData

class HeaderData {
  public mapName = ''
  public seedText = ''
  public worldGeneratorVersion = new Uint8Array(8)
  public guid = new Uint8Array(16)
  public worldId = 0
  public leftWorld = 0
  public rightWorld = 0
  public topWorld = 0
  public bottomWorld = 0
  public maxTilesY = 0
  public maxTilesX = 0
  public gameMode = 0 as GameMode
  public drunkWorld = false
  public getGoodWorld = false
  public getTenthAnniversaryWorld = false
  public dontStarveWorld = false
  public notTheBeesWorld = false
  public remixWorld = false
  public noTrapsWorld = false
  public zenithWorld = false
  public expertMode = false
  public creationTime = new Uint8Array(8)
  public moonType = 0
  public treeX = [0, 0, 0] as [number, number, number]
  public treeStyle = [0, 0, 0, 0] as [number, number, number, number]
  public caveBackX = [0, 0, 0] as [number, number, number]
  public caveBackStyle = [0, 0, 0, 0] as [number, number, number, number]
  public iceBackStyle = 0
  public jungleBackStyle = 0
  public hellBackStyle = 0
  public spawnTileX = 0
  public spawnTileY = 0
  public worldSurface = 0
  public rockLayer = 0
  public tempTime = 0
  public tempDayTime = false
  public tempMoonPhase = 0
  public tempBloodMoon = false
  public tempEclipse = false
  public dungeonX = 0
  public dungeonY = 0
  public crimson = false
  public downedBoss1 = false
  public downedBoss2 = false
  public downedBoss3 = false
  public downedQueenBee = false
  public downedMechBoss1 = false
  public downedMechBoss2 = false
  public downedMechBoss3 = false
  public downedMechBossAny = false
  public downedPlantBoss = false
  public downedGolemBoss = false
  public downedSlimeKing = false
  public savedGoblin = false
  public savedWizard = false
  public savedMech = false
  public downedGoblins = false
  public downedClown = false
  public downedFrost = false
  public downedPirates = false
  public shadowOrbSmashed = false
  public spawnMeteor = false
  public shadowOrbCount = 0
  public altarCount = 0
  public hardMode = false
  public afterPartyOfDoom = false
  public invasionDelay = 0
  public invasionSize = 0
  public invasionType = 0
  public invasionX = 0
  public slimeRainTime = 0
  public sundialCooldown = 0
  public tempRaining = false
  public tempRainTime = 0
  public tempMaxRain = 0
  public oreTier1 = 0
  public oreTier2 = 0
  public oreTier3 = 0
  public setBG0 = 0
  public setBG1 = 0
  public setBG2 = 0
  public setBG3 = 0
  public setBG4 = 0
  public setBG5 = 0
  public setBG6 = 0
  public setBG7 = 0
  public cloudBGActive = 0
  public numClouds = 0
  public windSpeed = 0
  public anglerWhoFinishedToday = [] as string[]
  public savedAngler = false
  public anglerQuest = 0
  public savedStylist = false
  public savedTaxCollector = false
  public savedGolfer = false
  public invasionSizeStart = 0
  public tempCultistDelay = 0
  public killCount = [] as number[]
  public fastForwardTimeToDawn = false
  public downedFishron = false
  public downedMartians = false
  public downedAncientCultist = false
  public downedMoonlord = false
  public downedHalloweenKing = false
  public downedHalloweenTree = false
  public downedChristmasIceQueen = false
  public downedChristmasSantank = false
  public downedChristmasTree = false
  public downedTowerSolar = false
  public downedTowerVortex = false
  public downedTowerNebula = false
  public downedTowerStardust = false
  public TowerActiveSolar = false
  public TowerActiveVortex = false
  public TowerActiveNebula = false
  public TowerActiveStardust = false
  public LunarApocalypseIsUp = false
  public tempPartyManual = false
  public tempPartyGenuine = false
  public tempPartyCooldown = 0
  public tempPartyCelebratingNPCs = [] as number[]
  public Temp_Sandstorm_Happening = false
  public Temp_Sandstorm_TimeLeft = 0
  public Temp_Sandstorm_Severity = 0
  public Temp_Sandstorm_IntendedSeverity = 0
  public savedBartender = false
  public DD2Event_DownedInvasionT1 = false
  public DD2Event_DownedInvasionT2 = false
  public DD2Event_DownedInvasionT3 = false
  public setBG8 = 0
  public setBG9 = 0
  public setBG10 = 0
  public setBG11 = 0
  public setBG12 = 0
  public combatBookWasUsed = false
  public lanternNightCooldown = 0
  public lanternNightGenuine = false
  public lanternNightManual = false
  public lanternNightNextNightIsGenuine = false
  public treeTopsVariations = [] as number[]
  public forceHalloweenForToday = false
  public forceXMasForToday = false
  public savedOreTierCopper = 0
  public savedOreTierIron = 0
  public savedOreTierSilver = 0
  public savedOreTierGold = 0
  public boughtCat = false
  public boughtDog = false
  public boughtBunny = false
  public downedEmpressOfLight = false
  public downedQueenSlime = false
  public downedDeerclops = false
  public unlockedSlimeBlueSpawn = false
  public unlockedMerchantSpawn = false
  public unlockedDemolitionistSpawn = false
  public unlockedPartyGirlSpawn = false
  public unlockedDyeTraderSpawn = false
  public unlockedTruffleSpawn = false
  public unlockedArmsDealerSpawn = false
  public unlockedNurseSpawn = false
  public unlockedPrincessSpawn = false
  public combatBookVolumeTwoWasUsed = false
  public peddlersSatchelWasUsed = false
  public unlockedSlimeGreenSpawn = false
  public unlockedSlimeOldSpawn = false
  public unlockedSlimePurpleSpawn = false
  public unlockedSlimeRainbowSpawn = false
  public unlockedSlimeRedSpawn = false
  public unlockedSlimeYellowSpawn = false
  public unlockedSlimeCopperSpawn = false
  public fastForwardTimeToDusk = false
  public moondialCooldown = 0
}

export default class HeaderIO implements Section.IO {
  public data = new HeaderData()

  public parse(reader: BinaryReader, world: WorldProperties): this {
    const isV140 = world.version >= 225
    const isV144 = world.version >= 269

    this.data.mapName = reader.readString()
    this.data.seedText = reader.readString()
    this.data.worldGeneratorVersion = reader.readBytes(8)
    this.data.guid = reader.readBytes(16)
    this.data.worldId = reader.readInt32()
    this.data.leftWorld = reader.readInt32()
    this.data.rightWorld = reader.readInt32()
    this.data.topWorld = reader.readInt32()
    this.data.bottomWorld = reader.readInt32()
    this.data.maxTilesY = reader.readInt32()
    this.data.maxTilesX = reader.readInt32()
    this.data.gameMode = Number(isV140 && reader.readInt32()) as GameMode
    this.data.drunkWorld = isV140 && reader.readBoolean()
    this.data.getGoodWorld = world.version >= 227 && reader.readBoolean()
    this.data.getTenthAnniversaryWorld = world.version >= 238 && reader.readBoolean()
    this.data.dontStarveWorld = world.version >= 239 && reader.readBoolean()
    this.data.notTheBeesWorld = world.version >= 241 && reader.readBoolean()
    this.data.remixWorld = world.version >= 249 && reader.readBoolean()
    this.data.noTrapsWorld = world.version >= 266 && reader.readBoolean()
    this.data.zenithWorld = world.version >= 267 && reader.readBoolean()
    this.data.expertMode = !isV140 && reader.readBoolean()
    this.data.creationTime = reader.readBytes(8)
    this.data.moonType = reader.readUInt8()
    this.data.treeX = [reader.readInt32(), reader.readInt32(), reader.readInt32()]
    this.data.treeStyle = [reader.readInt32(), reader.readInt32(), reader.readInt32(), reader.readInt32()]
    this.data.caveBackX = [reader.readInt32(), reader.readInt32(), reader.readInt32()]
    this.data.caveBackStyle = [reader.readInt32(), reader.readInt32(), reader.readInt32(), reader.readInt32()]
    this.data.iceBackStyle = reader.readInt32()
    this.data.jungleBackStyle = reader.readInt32()
    this.data.hellBackStyle = reader.readInt32()
    this.data.spawnTileX = reader.readInt32()
    this.data.spawnTileY = reader.readInt32()
    this.data.worldSurface = reader.readFloat64()
    this.data.rockLayer = reader.readFloat64()
    this.data.tempTime = reader.readFloat64()
    this.data.tempDayTime = reader.readBoolean()
    this.data.tempMoonPhase = reader.readInt32()
    this.data.tempBloodMoon = reader.readBoolean()
    this.data.tempEclipse = reader.readBoolean()
    this.data.dungeonX = reader.readInt32()
    this.data.dungeonY = reader.readInt32()
    this.data.crimson = reader.readBoolean()
    this.data.downedBoss1 = reader.readBoolean()
    this.data.downedBoss2 = reader.readBoolean()
    this.data.downedBoss3 = reader.readBoolean()
    this.data.downedQueenBee = reader.readBoolean()
    this.data.downedMechBoss1 = reader.readBoolean()
    this.data.downedMechBoss2 = reader.readBoolean()
    this.data.downedMechBoss3 = reader.readBoolean()
    this.data.downedMechBossAny = reader.readBoolean()
    this.data.downedPlantBoss = reader.readBoolean()
    this.data.downedGolemBoss = reader.readBoolean()
    this.data.downedSlimeKing = reader.readBoolean()
    this.data.savedGoblin = reader.readBoolean()
    this.data.savedWizard = reader.readBoolean()
    this.data.savedMech = reader.readBoolean()
    this.data.downedGoblins = reader.readBoolean()
    this.data.downedClown = reader.readBoolean()
    this.data.downedFrost = reader.readBoolean()
    this.data.downedPirates = reader.readBoolean()
    this.data.shadowOrbSmashed = reader.readBoolean()
    this.data.spawnMeteor = reader.readBoolean()
    this.data.shadowOrbCount = reader.readUInt8()
    this.data.altarCount = reader.readInt32()
    this.data.hardMode = reader.readBoolean()
    this.data.afterPartyOfDoom = world.version >= 257 && reader.readBoolean()
    this.data.invasionDelay = reader.readInt32()
    this.data.invasionSize = reader.readInt32()
    this.data.invasionType = reader.readInt32()
    this.data.invasionX = reader.readFloat64()
    this.data.slimeRainTime = reader.readFloat64()
    this.data.sundialCooldown = reader.readUInt8()
    this.data.tempRaining = reader.readBoolean()
    this.data.tempRainTime = reader.readInt32()
    this.data.tempMaxRain = reader.readFloat32()
    this.data.oreTier1 = reader.readInt32()
    this.data.oreTier2 = reader.readInt32()
    this.data.oreTier3 = reader.readInt32()
    this.data.setBG0 = reader.readUInt8()
    this.data.setBG1 = reader.readUInt8()
    this.data.setBG2 = reader.readUInt8()
    this.data.setBG3 = reader.readUInt8()
    this.data.setBG4 = reader.readUInt8()
    this.data.setBG5 = reader.readUInt8()
    this.data.setBG6 = reader.readUInt8()
    this.data.setBG7 = reader.readUInt8()
    this.data.cloudBGActive = reader.readInt32()
    this.data.numClouds = reader.readInt16()
    this.data.windSpeed = reader.readFloat32()
    this.data.anglerWhoFinishedToday = reader.readArray(reader.readInt32(), () => reader.readString())
    this.data.savedAngler = reader.readBoolean()
    this.data.anglerQuest = reader.readInt32()
    this.data.savedStylist = reader.readBoolean()
    this.data.savedTaxCollector = reader.readBoolean()
    this.data.savedGolfer = isV140 && reader.readBoolean()
    this.data.invasionSizeStart = reader.readInt32()
    this.data.tempCultistDelay = reader.readInt32()
    this.data.killCount = reader.readArray(reader.readInt16(), () => reader.readInt32())
    this.data.fastForwardTimeToDawn = reader.readBoolean()
    this.data.downedFishron = reader.readBoolean()
    this.data.downedMartians = reader.readBoolean()
    this.data.downedAncientCultist = reader.readBoolean()
    this.data.downedMoonlord = reader.readBoolean()
    this.data.downedHalloweenKing = reader.readBoolean()
    this.data.downedHalloweenTree = reader.readBoolean()
    this.data.downedChristmasIceQueen = reader.readBoolean()
    this.data.downedChristmasSantank = reader.readBoolean()
    this.data.downedChristmasTree = reader.readBoolean()
    this.data.downedTowerSolar = reader.readBoolean()
    this.data.downedTowerVortex = reader.readBoolean()
    this.data.downedTowerNebula = reader.readBoolean()
    this.data.downedTowerStardust = reader.readBoolean()
    this.data.TowerActiveSolar = reader.readBoolean()
    this.data.TowerActiveVortex = reader.readBoolean()
    this.data.TowerActiveNebula = reader.readBoolean()
    this.data.TowerActiveStardust = reader.readBoolean()
    this.data.LunarApocalypseIsUp = reader.readBoolean()
    this.data.tempPartyManual = reader.readBoolean()
    this.data.tempPartyGenuine = reader.readBoolean()
    this.data.tempPartyCooldown = reader.readInt32()
    this.data.tempPartyCelebratingNPCs = reader.readArray(reader.readInt32(), () => reader.readInt32())
    this.data.Temp_Sandstorm_Happening = reader.readBoolean()
    this.data.Temp_Sandstorm_TimeLeft = reader.readInt32()
    this.data.Temp_Sandstorm_Severity = reader.readFloat32()
    this.data.Temp_Sandstorm_IntendedSeverity = reader.readFloat32()
    this.data.savedBartender = reader.readBoolean()
    this.data.DD2Event_DownedInvasionT1 = reader.readBoolean()
    this.data.DD2Event_DownedInvasionT2 = reader.readBoolean()
    this.data.DD2Event_DownedInvasionT3 = reader.readBoolean()
    this.data.setBG8 = Number(isV140 && reader.readUInt8())
    this.data.setBG9 = Number(isV140 && reader.readUInt8())
    this.data.setBG10 = Number(isV140 && reader.readUInt8())
    this.data.setBG11 = Number(isV140 && reader.readUInt8())
    this.data.setBG12 = Number(isV140 && reader.readUInt8())
    this.data.combatBookWasUsed = isV140 && reader.readBoolean()
    this.data.lanternNightCooldown = Number(isV140 && reader.readInt32())
    this.data.lanternNightGenuine = isV140 && reader.readBoolean()
    this.data.lanternNightManual = isV140 && reader.readBoolean()
    this.data.lanternNightNextNightIsGenuine = isV140 && reader.readBoolean()
    this.data.treeTopsVariations = isV140 ? reader.readArray(reader.readInt32(), () => reader.readInt32()) : []
    this.data.forceHalloweenForToday = isV140 && reader.readBoolean()
    this.data.forceXMasForToday = isV140 && reader.readBoolean()
    this.data.savedOreTierCopper = Number(isV140 && reader.readInt32())
    this.data.savedOreTierIron = Number(isV140 && reader.readInt32())
    this.data.savedOreTierSilver = Number(isV140 && reader.readInt32())
    this.data.savedOreTierGold = Number(isV140 && reader.readInt32())
    this.data.boughtCat = isV140 && reader.readBoolean()
    this.data.boughtDog = isV140 && reader.readBoolean()
    this.data.boughtBunny = isV140 && reader.readBoolean()
    this.data.downedEmpressOfLight = isV140 && reader.readBoolean()
    this.data.downedQueenSlime = isV140 && reader.readBoolean()
    this.data.downedDeerclops = world.version >= 240 && reader.readBoolean()
    this.data.unlockedSlimeBlueSpawn = isV144 && reader.readBoolean()
    this.data.unlockedMerchantSpawn = isV144 && reader.readBoolean()
    this.data.unlockedDemolitionistSpawn = isV144 && reader.readBoolean()
    this.data.unlockedPartyGirlSpawn = isV144 && reader.readBoolean()
    this.data.unlockedDyeTraderSpawn = isV144 && reader.readBoolean()
    this.data.unlockedTruffleSpawn = isV144 && reader.readBoolean()
    this.data.unlockedArmsDealerSpawn = isV144 && reader.readBoolean()
    this.data.unlockedNurseSpawn = isV144 && reader.readBoolean()
    this.data.unlockedPrincessSpawn = isV144 && reader.readBoolean()
    this.data.combatBookVolumeTwoWasUsed = isV144 && reader.readBoolean()
    this.data.peddlersSatchelWasUsed = isV144 && reader.readBoolean()
    this.data.unlockedSlimeGreenSpawn = isV144 && reader.readBoolean()
    this.data.unlockedSlimeOldSpawn = isV144 && reader.readBoolean()
    this.data.unlockedSlimePurpleSpawn = isV144 && reader.readBoolean()
    this.data.unlockedSlimeRainbowSpawn = isV144 && reader.readBoolean()
    this.data.unlockedSlimeRedSpawn = isV144 && reader.readBoolean()
    this.data.unlockedSlimeYellowSpawn = isV144 && reader.readBoolean()
    this.data.unlockedSlimeCopperSpawn = isV144 && reader.readBoolean()
    this.data.fastForwardTimeToDusk = isV144 && reader.readBoolean()
    this.data.moondialCooldown = Number(isV144 && reader.readUInt8())

    return this
  }
  public save(saver: BinarySaver, world: WorldProperties): number {
    saver.saveString(this.data.mapName)
    saver.saveString(this.data.seedText)
    saver.saveBytes(this.data.worldGeneratorVersion)
    saver.saveBytes(this.data.guid)
    saver.saveInt32(this.data.worldId)
    saver.saveInt32(this.data.leftWorld)
    saver.saveInt32(this.data.rightWorld)
    saver.saveInt32(this.data.topWorld)
    saver.saveInt32(this.data.bottomWorld)
    saver.saveInt32(this.data.maxTilesY)
    saver.saveInt32(this.data.maxTilesX)
    if (world.version >= 225) {
      saver.saveInt32(this.data.gameMode)
      saver.saveBoolean(this.data.drunkWorld)

      if (world.version >= 227) {
        saver.saveBoolean(this.data.getGoodWorld)
      }
      if (world.version >= 238) {
        saver.saveBoolean(this.data.getTenthAnniversaryWorld)
      }
      if (world.version >= 239) {
        saver.saveBoolean(this.data.dontStarveWorld)
      }
      if (world.version >= 241) {
        saver.saveBoolean(this.data.notTheBeesWorld)
      }
      if (world.version >= 249) {
        saver.saveBoolean(this.data.remixWorld)
      }
      if (world.version >= 266) {
        saver.saveBoolean(this.data.noTrapsWorld)
      }
      if (world.version >= 267) {
        saver.saveBoolean(this.data.zenithWorld)
      }
    } else {
      saver.saveBoolean(this.data.expertMode)
    }
    saver.saveBytes(this.data.creationTime)
    saver.saveUInt8(this.data.moonType)
    saver.saveInt32(this.data.treeX[0])
    saver.saveInt32(this.data.treeX[1])
    saver.saveInt32(this.data.treeX[2])
    saver.saveInt32(this.data.treeStyle[0])
    saver.saveInt32(this.data.treeStyle[1])
    saver.saveInt32(this.data.treeStyle[2])
    saver.saveInt32(this.data.treeStyle[3])
    saver.saveInt32(this.data.caveBackX[0])
    saver.saveInt32(this.data.caveBackX[1])
    saver.saveInt32(this.data.caveBackX[2])
    saver.saveInt32(this.data.caveBackStyle[0])
    saver.saveInt32(this.data.caveBackStyle[1])
    saver.saveInt32(this.data.caveBackStyle[2])
    saver.saveInt32(this.data.caveBackStyle[3])
    saver.saveInt32(this.data.iceBackStyle)
    saver.saveInt32(this.data.jungleBackStyle)
    saver.saveInt32(this.data.hellBackStyle)
    saver.saveInt32(this.data.spawnTileX)
    saver.saveInt32(this.data.spawnTileY)
    saver.saveFloat64(this.data.worldSurface)
    saver.saveFloat64(this.data.rockLayer)
    saver.saveFloat64(this.data.tempTime)
    saver.saveBoolean(this.data.tempDayTime)
    saver.saveInt32(this.data.tempMoonPhase)
    saver.saveBoolean(this.data.tempBloodMoon)
    saver.saveBoolean(this.data.tempEclipse)
    saver.saveInt32(this.data.dungeonX)
    saver.saveInt32(this.data.dungeonY)
    saver.saveBoolean(this.data.crimson)
    saver.saveBoolean(this.data.downedBoss1)
    saver.saveBoolean(this.data.downedBoss2)
    saver.saveBoolean(this.data.downedBoss3)
    saver.saveBoolean(this.data.downedQueenBee)
    saver.saveBoolean(this.data.downedMechBoss1)
    saver.saveBoolean(this.data.downedMechBoss2)
    saver.saveBoolean(this.data.downedMechBoss3)
    saver.saveBoolean(this.data.downedMechBossAny)
    saver.saveBoolean(this.data.downedPlantBoss)
    saver.saveBoolean(this.data.downedGolemBoss)
    saver.saveBoolean(this.data.downedSlimeKing)
    saver.saveBoolean(this.data.savedGoblin)
    saver.saveBoolean(this.data.savedWizard)
    saver.saveBoolean(this.data.savedMech)
    saver.saveBoolean(this.data.downedGoblins)
    saver.saveBoolean(this.data.downedClown)
    saver.saveBoolean(this.data.downedFrost)
    saver.saveBoolean(this.data.downedPirates)
    saver.saveBoolean(this.data.shadowOrbSmashed)
    saver.saveBoolean(this.data.spawnMeteor)
    saver.saveUInt8(this.data.shadowOrbCount)
    saver.saveInt32(this.data.altarCount)
    saver.saveBoolean(this.data.hardMode)
    if (world.version >= 257) {
      saver.saveBoolean(this.data.afterPartyOfDoom)
    }
    saver.saveInt32(this.data.invasionDelay)
    saver.saveInt32(this.data.invasionSize)
    saver.saveInt32(this.data.invasionType)
    saver.saveFloat64(this.data.invasionX)
    saver.saveFloat64(this.data.slimeRainTime)
    saver.saveUInt8(this.data.sundialCooldown)
    saver.saveBoolean(this.data.tempRaining)
    saver.saveInt32(this.data.tempRainTime)
    saver.saveFloat32(this.data.tempMaxRain)
    saver.saveInt32(this.data.oreTier1)
    saver.saveInt32(this.data.oreTier2)
    saver.saveInt32(this.data.oreTier3)
    saver.saveUInt8(this.data.setBG0)
    saver.saveUInt8(this.data.setBG1)
    saver.saveUInt8(this.data.setBG2)
    saver.saveUInt8(this.data.setBG3)
    saver.saveUInt8(this.data.setBG4)
    saver.saveUInt8(this.data.setBG5)
    saver.saveUInt8(this.data.setBG6)
    saver.saveUInt8(this.data.setBG7)
    saver.saveInt32(this.data.cloudBGActive)
    saver.saveInt16(this.data.numClouds)
    saver.saveFloat32(this.data.windSpeed)
    saver.saveInt32(this.data.anglerWhoFinishedToday.length)
    this.data.anglerWhoFinishedToday.forEach((e: any) => saver.saveString(e))
    saver.saveBoolean(this.data.savedAngler)
    saver.saveInt32(this.data.anglerQuest)
    saver.saveBoolean(this.data.savedStylist)
    saver.saveBoolean(this.data.savedTaxCollector)
    if (world.version >= 225) {
      saver.saveBoolean(this.data.savedGolfer)
    }
    saver.saveInt32(this.data.invasionSizeStart)
    saver.saveInt32(this.data.tempCultistDelay)
    saver.saveInt16(this.data.killCount.length)
    this.data.killCount.forEach((e: any) => saver.saveInt32(e))
    saver.saveBoolean(this.data.fastForwardTimeToDawn)
    saver.saveBoolean(this.data.downedFishron)
    saver.saveBoolean(this.data.downedMartians)
    saver.saveBoolean(this.data.downedAncientCultist)
    saver.saveBoolean(this.data.downedMoonlord)
    saver.saveBoolean(this.data.downedHalloweenKing)
    saver.saveBoolean(this.data.downedHalloweenTree)
    saver.saveBoolean(this.data.downedChristmasIceQueen)
    saver.saveBoolean(this.data.downedChristmasSantank)
    saver.saveBoolean(this.data.downedChristmasTree)
    saver.saveBoolean(this.data.downedTowerSolar)
    saver.saveBoolean(this.data.downedTowerVortex)
    saver.saveBoolean(this.data.downedTowerNebula)
    saver.saveBoolean(this.data.downedTowerStardust)
    saver.saveBoolean(this.data.TowerActiveSolar)
    saver.saveBoolean(this.data.TowerActiveVortex)
    saver.saveBoolean(this.data.TowerActiveNebula)
    saver.saveBoolean(this.data.TowerActiveStardust)
    saver.saveBoolean(this.data.LunarApocalypseIsUp)
    saver.saveBoolean(this.data.tempPartyManual)
    saver.saveBoolean(this.data.tempPartyGenuine)
    saver.saveInt32(this.data.tempPartyCooldown)
    saver.saveInt32(this.data.tempPartyCelebratingNPCs.length)
    this.data.tempPartyCelebratingNPCs.forEach((e: any) => saver.saveInt32(e))
    saver.saveBoolean(this.data.Temp_Sandstorm_Happening)
    saver.saveInt32(this.data.Temp_Sandstorm_TimeLeft)
    saver.saveFloat32(this.data.Temp_Sandstorm_Severity)
    saver.saveFloat32(this.data.Temp_Sandstorm_IntendedSeverity)
    saver.saveBoolean(this.data.savedBartender)
    saver.saveBoolean(this.data.DD2Event_DownedInvasionT1)
    saver.saveBoolean(this.data.DD2Event_DownedInvasionT2)
    saver.saveBoolean(this.data.DD2Event_DownedInvasionT3)

    if (world.version >= 225) {
      saver.saveUInt8(this.data.setBG8)
      saver.saveUInt8(this.data.setBG9)
      saver.saveUInt8(this.data.setBG10)
      saver.saveUInt8(this.data.setBG11)
      saver.saveUInt8(this.data.setBG12)

      saver.saveBoolean(this.data.combatBookWasUsed)
      saver.saveInt32(this.data.lanternNightCooldown)
      saver.saveBoolean(this.data.lanternNightGenuine)
      saver.saveBoolean(this.data.lanternNightManual)
      saver.saveBoolean(this.data.lanternNightNextNightIsGenuine)

      saver.saveInt32(this.data.treeTopsVariations.length)
      this.data.treeTopsVariations.forEach((e: any) => saver.saveInt32(e))

      saver.saveBoolean(this.data.forceHalloweenForToday)
      saver.saveBoolean(this.data.forceXMasForToday)

      saver.saveInt32(this.data.savedOreTierCopper)
      saver.saveInt32(this.data.savedOreTierIron)
      saver.saveInt32(this.data.savedOreTierSilver)
      saver.saveInt32(this.data.savedOreTierGold)

      saver.saveBoolean(this.data.boughtCat)
      saver.saveBoolean(this.data.boughtDog)
      saver.saveBoolean(this.data.boughtBunny)

      saver.saveBoolean(this.data.downedEmpressOfLight)
      saver.saveBoolean(this.data.downedQueenSlime)
    }

    if (world.version >= 240) {
      saver.saveBoolean(this.data.downedDeerclops)
    }

    if (world.version >= 269) {
      saver.saveBoolean(this.data.unlockedSlimeBlueSpawn)
      saver.saveBoolean(this.data.unlockedMerchantSpawn)
      saver.saveBoolean(this.data.unlockedDemolitionistSpawn)
      saver.saveBoolean(this.data.unlockedPartyGirlSpawn)
      saver.saveBoolean(this.data.unlockedDyeTraderSpawn)
      saver.saveBoolean(this.data.unlockedTruffleSpawn)
      saver.saveBoolean(this.data.unlockedArmsDealerSpawn)
      saver.saveBoolean(this.data.unlockedNurseSpawn)
      saver.saveBoolean(this.data.unlockedPrincessSpawn)
      saver.saveBoolean(this.data.combatBookVolumeTwoWasUsed)
      saver.saveBoolean(this.data.peddlersSatchelWasUsed)
      saver.saveBoolean(this.data.unlockedSlimeGreenSpawn)
      saver.saveBoolean(this.data.unlockedSlimeOldSpawn)
      saver.saveBoolean(this.data.unlockedSlimePurpleSpawn)
      saver.saveBoolean(this.data.unlockedSlimeRainbowSpawn)
      saver.saveBoolean(this.data.unlockedSlimeRedSpawn)
      saver.saveBoolean(this.data.unlockedSlimeYellowSpawn)
      saver.saveBoolean(this.data.unlockedSlimeCopperSpawn)
      saver.saveBoolean(this.data.fastForwardTimeToDusk)
      saver.saveUInt8(this.data.moondialCooldown)
    }

    return saver.getPosition()
  }
}
