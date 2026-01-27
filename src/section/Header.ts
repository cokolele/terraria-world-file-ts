import type BinaryReader from '../BinaryReader'
import type { WorldProperties } from '../FileReader'
import type BinarySaver from '../BinarySaver'
import type { Section } from '../sections'
import type { GameMode, Position } from '../types'

export class HeaderData {
  public mapName!: string
  public seedText!: string
  public worldGeneratorVersion!: Uint8Array<ArrayBuffer>
  public guid!: Uint8Array<ArrayBuffer>
  public worldId!: number
  public leftWorld!: number
  public rightWorld!: number
  public topWorld!: number
  public bottomWorld!: number
  public maxTilesY!: number
  public maxTilesX!: number
  public gameMode!: GameMode
  public drunkWorld!: boolean
  public getGoodWorld!: boolean
  public getTenthAnniversaryWorld!: boolean
  public dontStarveWorld!: boolean
  public notTheBeesWorld!: boolean
  public remixWorld!: boolean
  public noTrapsWorld!: boolean
  public zenithWorld!: boolean
  public skyblockWorld!: boolean
  public expertMode!: boolean
  public creationTime!: Uint8Array<ArrayBuffer>
  public lastPlayed?: Uint8Array<ArrayBuffer>
  public moonType!: number
  public treeX!: [number, number, number]
  public treeStyle!: [number, number, number, number]
  public caveBackX!: [number, number, number]
  public caveBackStyle!: [number, number, number, number]
  public iceBackStyle!: number
  public jungleBackStyle!: number
  public hellBackStyle!: number
  public spawnTileX!: number
  public spawnTileY!: number
  public worldSurface!: number
  public rockLayer!: number
  public tempTime!: number
  public tempDayTime!: boolean
  public tempMoonPhase!: number
  public tempBloodMoon!: boolean
  public tempEclipse!: boolean
  public dungeonX!: number
  public dungeonY!: number
  public crimson!: boolean
  public downedBoss1!: boolean
  public downedBoss2!: boolean
  public downedBoss3!: boolean
  public downedQueenBee!: boolean
  public downedMechBoss1!: boolean
  public downedMechBoss2!: boolean
  public downedMechBoss3!: boolean
  public downedMechBossAny!: boolean
  public downedPlantBoss!: boolean
  public downedGolemBoss!: boolean
  public downedSlimeKing!: boolean
  public savedGoblin!: boolean
  public savedWizard!: boolean
  public savedMech!: boolean
  public downedGoblins!: boolean
  public downedClown!: boolean
  public downedFrost!: boolean
  public downedPirates!: boolean
  public shadowOrbSmashed!: boolean
  public spawnMeteor!: boolean
  public shadowOrbCount!: number
  public altarCount!: number
  public hardMode!: boolean
  public afterPartyOfDoom!: boolean
  public invasionDelay!: number
  public invasionSize!: number
  public invasionType!: number
  public invasionX!: number
  public slimeRainTime!: number
  public sundialCooldown!: number
  public tempRaining!: boolean
  public tempRainTime!: number
  public tempMaxRain!: number
  public oreTier1!: number
  public oreTier2!: number
  public oreTier3!: number
  public setBG0!: number
  public setBG1!: number
  public setBG2!: number
  public setBG3!: number
  public setBG4!: number
  public setBG5!: number
  public setBG6!: number
  public setBG7!: number
  public cloudBGActive!: number
  public numClouds!: number
  public windSpeed!: number
  public anglerWhoFinishedToday!: string[]
  public savedAngler!: boolean
  public anglerQuest!: number
  public savedStylist!: boolean
  public savedTaxCollector!: boolean
  public savedGolfer!: boolean
  public invasionSizeStart!: number
  public tempCultistDelay!: number
  public killCount!: number[]
  public claimableBanners!: number[]
  public fastForwardTimeToDawn!: boolean
  public downedFishron!: boolean
  public downedMartians!: boolean
  public downedAncientCultist!: boolean
  public downedMoonlord!: boolean
  public downedHalloweenKing!: boolean
  public downedHalloweenTree!: boolean
  public downedChristmasIceQueen!: boolean
  public downedChristmasSantank!: boolean
  public downedChristmasTree!: boolean
  public downedTowerSolar!: boolean
  public downedTowerVortex!: boolean
  public downedTowerNebula!: boolean
  public downedTowerStardust!: boolean
  public TowerActiveSolar!: boolean
  public TowerActiveVortex!: boolean
  public TowerActiveNebula!: boolean
  public TowerActiveStardust!: boolean
  public LunarApocalypseIsUp!: boolean
  public tempPartyManual!: boolean
  public tempPartyGenuine!: boolean
  public tempPartyCooldown!: number
  public tempPartyCelebratingNPCs!: number[]
  public Temp_Sandstorm_Happening!: boolean
  public Temp_Sandstorm_TimeLeft!: number
  public Temp_Sandstorm_Severity!: number
  public Temp_Sandstorm_IntendedSeverity!: number
  public savedBartender!: boolean
  public DD2Event_DownedInvasionT1!: boolean
  public DD2Event_DownedInvasionT2!: boolean
  public DD2Event_DownedInvasionT3!: boolean
  public setBG8!: number
  public setBG9!: number
  public setBG10!: number
  public setBG11!: number
  public setBG12!: number
  public combatBookWasUsed!: boolean
  public lanternNightCooldown!: number
  public lanternNightGenuine!: boolean
  public lanternNightManual!: boolean
  public lanternNightNextNightIsGenuine!: boolean
  public treeTopsVariations!: number[]
  public forceHalloweenForToday!: boolean
  public forceXMasForToday!: boolean
  public savedOreTierCopper!: number
  public savedOreTierIron!: number
  public savedOreTierSilver!: number
  public savedOreTierGold!: number
  public boughtCat!: boolean
  public boughtDog!: boolean
  public boughtBunny!: boolean
  public downedEmpressOfLight!: boolean
  public downedQueenSlime!: boolean
  public downedDeerclops!: boolean
  public unlockedSlimeBlueSpawn!: boolean
  public unlockedMerchantSpawn!: boolean
  public unlockedDemolitionistSpawn!: boolean
  public unlockedPartyGirlSpawn!: boolean
  public unlockedDyeTraderSpawn!: boolean
  public unlockedTruffleSpawn!: boolean
  public unlockedArmsDealerSpawn!: boolean
  public unlockedNurseSpawn!: boolean
  public unlockedPrincessSpawn!: boolean
  public combatBookVolumeTwoWasUsed!: boolean
  public peddlersSatchelWasUsed!: boolean
  public unlockedSlimeGreenSpawn!: boolean
  public unlockedSlimeOldSpawn!: boolean
  public unlockedSlimePurpleSpawn!: boolean
  public unlockedSlimeRainbowSpawn!: boolean
  public unlockedSlimeRedSpawn!: boolean
  public unlockedSlimeYellowSpawn!: boolean
  public unlockedSlimeCopperSpawn!: boolean
  public fastForwardTimeToDusk!: boolean
  public moondialCooldown!: number

  public forceHalloweenForever!: boolean
  public forceXMasForever!: boolean
  public vampireSeed!: boolean
  public infectedSeed!: boolean
  public tempMeteorShowerCount!: number
  public tempCoinRain!: number
  public teamBasedSpawnsSeed!: boolean
  public extraSpawnPoints!: Position[]
  public dualDungeonsSeed!: boolean
  public manifest?: string
}

export default class HeaderIO implements Section.IODefinition<HeaderData> {
  public parse(reader: BinaryReader, world: WorldProperties): HeaderData {
    const isV140 = world.version >= 225
    const isV144 = world.version >= 269

    const data = new HeaderData()

    data.mapName = reader.readString()
    data.seedText = reader.readString()
    data.worldGeneratorVersion = reader.readBytes(8)
    data.guid = reader.readBytes(16)
    data.worldId = reader.readInt32()
    data.leftWorld = reader.readInt32()
    data.rightWorld = reader.readInt32()
    data.topWorld = reader.readInt32()
    data.bottomWorld = reader.readInt32()
    data.maxTilesY = reader.readInt32()
    data.maxTilesX = reader.readInt32()
    data.gameMode = Number(isV140 && reader.readInt32()) as GameMode
    data.drunkWorld = isV140 && reader.readBoolean()
    data.getGoodWorld = world.version >= 227 && reader.readBoolean()
    data.getTenthAnniversaryWorld = world.version >= 238 && reader.readBoolean()
    data.dontStarveWorld = world.version >= 239 && reader.readBoolean()
    data.notTheBeesWorld = world.version >= 241 && reader.readBoolean()
    data.remixWorld = world.version >= 249 && reader.readBoolean()
    data.noTrapsWorld = world.version >= 266 && reader.readBoolean()
    data.zenithWorld = world.version >= 267 && reader.readBoolean()
    data.skyblockWorld = world.version >= 302 && reader.readBoolean()
    data.expertMode = !isV140 && reader.readBoolean()
    data.creationTime = reader.readBytes(8)
    data.lastPlayed = world.version >= 284 ? reader.readBytes(8) : undefined
    data.moonType = reader.readUInt8()
    data.treeX = [reader.readInt32(), reader.readInt32(), reader.readInt32()]
    data.treeStyle = [reader.readInt32(), reader.readInt32(), reader.readInt32(), reader.readInt32()]
    data.caveBackX = [reader.readInt32(), reader.readInt32(), reader.readInt32()]
    data.caveBackStyle = [reader.readInt32(), reader.readInt32(), reader.readInt32(), reader.readInt32()]
    data.iceBackStyle = reader.readInt32()
    data.jungleBackStyle = reader.readInt32()
    data.hellBackStyle = reader.readInt32()
    data.spawnTileX = reader.readInt32()
    data.spawnTileY = reader.readInt32()
    data.worldSurface = reader.readFloat64()
    data.rockLayer = reader.readFloat64()
    data.tempTime = reader.readFloat64()
    data.tempDayTime = reader.readBoolean()
    data.tempMoonPhase = reader.readInt32()
    data.tempBloodMoon = reader.readBoolean()
    data.tempEclipse = reader.readBoolean()
    data.dungeonX = reader.readInt32()
    data.dungeonY = reader.readInt32()
    data.crimson = reader.readBoolean()
    data.downedBoss1 = reader.readBoolean()
    data.downedBoss2 = reader.readBoolean()
    data.downedBoss3 = reader.readBoolean()
    data.downedQueenBee = reader.readBoolean()
    data.downedMechBoss1 = reader.readBoolean()
    data.downedMechBoss2 = reader.readBoolean()
    data.downedMechBoss3 = reader.readBoolean()
    data.downedMechBossAny = reader.readBoolean()
    data.downedPlantBoss = reader.readBoolean()
    data.downedGolemBoss = reader.readBoolean()
    data.downedSlimeKing = reader.readBoolean()
    data.savedGoblin = reader.readBoolean()
    data.savedWizard = reader.readBoolean()
    data.savedMech = reader.readBoolean()
    data.downedGoblins = reader.readBoolean()
    data.downedClown = reader.readBoolean()
    data.downedFrost = reader.readBoolean()
    data.downedPirates = reader.readBoolean()
    data.shadowOrbSmashed = reader.readBoolean()
    data.spawnMeteor = reader.readBoolean()
    data.shadowOrbCount = reader.readUInt8()
    data.altarCount = reader.readInt32()
    data.hardMode = reader.readBoolean()
    data.afterPartyOfDoom = world.version >= 257 && reader.readBoolean()
    data.invasionDelay = reader.readInt32()
    data.invasionSize = reader.readInt32()
    data.invasionType = reader.readInt32()
    data.invasionX = reader.readFloat64()
    data.slimeRainTime = reader.readFloat64()
    data.sundialCooldown = reader.readUInt8()
    data.tempRaining = reader.readBoolean()
    data.tempRainTime = reader.readInt32()
    data.tempMaxRain = reader.readFloat32()
    data.oreTier1 = reader.readInt32()
    data.oreTier2 = reader.readInt32()
    data.oreTier3 = reader.readInt32()
    data.setBG0 = reader.readUInt8()
    data.setBG1 = reader.readUInt8()
    data.setBG2 = reader.readUInt8()
    data.setBG3 = reader.readUInt8()
    data.setBG4 = reader.readUInt8()
    data.setBG5 = reader.readUInt8()
    data.setBG6 = reader.readUInt8()
    data.setBG7 = reader.readUInt8()
    data.cloudBGActive = reader.readInt32()
    data.numClouds = reader.readInt16()
    data.windSpeed = reader.readFloat32()
    data.anglerWhoFinishedToday = reader.readArray(reader.readInt32(), () => reader.readString())
    data.savedAngler = reader.readBoolean()
    data.anglerQuest = reader.readInt32()
    data.savedStylist = reader.readBoolean()
    data.savedTaxCollector = reader.readBoolean()
    data.savedGolfer = isV140 && reader.readBoolean()
    data.invasionSizeStart = reader.readInt32()
    data.tempCultistDelay = reader.readInt32()
    data.killCount = reader.readArray(reader.readInt16(), () => reader.readInt32())
    if (world.version >= 289) {
      data.claimableBanners = reader.readArray(reader.readInt16(), () => reader.readUInt16())
    }
    data.fastForwardTimeToDawn = reader.readBoolean()
    data.downedFishron = reader.readBoolean()
    data.downedMartians = reader.readBoolean()
    data.downedAncientCultist = reader.readBoolean()
    data.downedMoonlord = reader.readBoolean()
    data.downedHalloweenKing = reader.readBoolean()
    data.downedHalloweenTree = reader.readBoolean()
    data.downedChristmasIceQueen = reader.readBoolean()
    data.downedChristmasSantank = reader.readBoolean()
    data.downedChristmasTree = reader.readBoolean()
    data.downedTowerSolar = reader.readBoolean()
    data.downedTowerVortex = reader.readBoolean()
    data.downedTowerNebula = reader.readBoolean()
    data.downedTowerStardust = reader.readBoolean()
    data.TowerActiveSolar = reader.readBoolean()
    data.TowerActiveVortex = reader.readBoolean()
    data.TowerActiveNebula = reader.readBoolean()
    data.TowerActiveStardust = reader.readBoolean()
    data.LunarApocalypseIsUp = reader.readBoolean()
    data.tempPartyManual = reader.readBoolean()
    data.tempPartyGenuine = reader.readBoolean()
    data.tempPartyCooldown = reader.readInt32()
    data.tempPartyCelebratingNPCs = reader.readArray(reader.readInt32(), () => reader.readInt32())
    data.Temp_Sandstorm_Happening = reader.readBoolean()
    data.Temp_Sandstorm_TimeLeft = reader.readInt32()
    data.Temp_Sandstorm_Severity = reader.readFloat32()
    data.Temp_Sandstorm_IntendedSeverity = reader.readFloat32()
    data.savedBartender = reader.readBoolean()
    data.DD2Event_DownedInvasionT1 = reader.readBoolean()
    data.DD2Event_DownedInvasionT2 = reader.readBoolean()
    data.DD2Event_DownedInvasionT3 = reader.readBoolean()
    data.setBG8 = Number(isV140 && reader.readUInt8())
    data.setBG9 = Number(isV140 && reader.readUInt8())
    data.setBG10 = Number(isV140 && reader.readUInt8())
    data.setBG11 = Number(isV140 && reader.readUInt8())
    data.setBG12 = Number(isV140 && reader.readUInt8())
    data.combatBookWasUsed = isV140 && reader.readBoolean()
    data.lanternNightCooldown = Number(isV140 && reader.readInt32())
    data.lanternNightGenuine = isV140 && reader.readBoolean()
    data.lanternNightManual = isV140 && reader.readBoolean()
    data.lanternNightNextNightIsGenuine = isV140 && reader.readBoolean()
    data.treeTopsVariations = isV140 ? reader.readArray(reader.readInt32(), () => reader.readInt32()) : []
    data.forceHalloweenForToday = isV140 && reader.readBoolean()
    data.forceXMasForToday = isV140 && reader.readBoolean()
    data.savedOreTierCopper = Number(isV140 && reader.readInt32())
    data.savedOreTierIron = Number(isV140 && reader.readInt32())
    data.savedOreTierSilver = Number(isV140 && reader.readInt32())
    data.savedOreTierGold = Number(isV140 && reader.readInt32())
    data.boughtCat = isV140 && reader.readBoolean()
    data.boughtDog = isV140 && reader.readBoolean()
    data.boughtBunny = isV140 && reader.readBoolean()
    data.downedEmpressOfLight = isV140 && reader.readBoolean()
    data.downedQueenSlime = isV140 && reader.readBoolean()
    data.downedDeerclops = world.version >= 240 && reader.readBoolean()
    data.unlockedSlimeBlueSpawn = isV144 && reader.readBoolean()
    data.unlockedMerchantSpawn = isV144 && reader.readBoolean()
    data.unlockedDemolitionistSpawn = isV144 && reader.readBoolean()
    data.unlockedPartyGirlSpawn = isV144 && reader.readBoolean()
    data.unlockedDyeTraderSpawn = isV144 && reader.readBoolean()
    data.unlockedTruffleSpawn = isV144 && reader.readBoolean()
    data.unlockedArmsDealerSpawn = isV144 && reader.readBoolean()
    data.unlockedNurseSpawn = isV144 && reader.readBoolean()
    data.unlockedPrincessSpawn = isV144 && reader.readBoolean()
    data.combatBookVolumeTwoWasUsed = isV144 && reader.readBoolean()
    data.peddlersSatchelWasUsed = isV144 && reader.readBoolean()
    data.unlockedSlimeGreenSpawn = isV144 && reader.readBoolean()
    data.unlockedSlimeOldSpawn = isV144 && reader.readBoolean()
    data.unlockedSlimePurpleSpawn = isV144 && reader.readBoolean()
    data.unlockedSlimeRainbowSpawn = isV144 && reader.readBoolean()
    data.unlockedSlimeRedSpawn = isV144 && reader.readBoolean()
    data.unlockedSlimeYellowSpawn = isV144 && reader.readBoolean()
    data.unlockedSlimeCopperSpawn = isV144 && reader.readBoolean()
    data.fastForwardTimeToDusk = isV144 && reader.readBoolean()
    data.moondialCooldown = Number(isV144 && reader.readUInt8())
    data.forceHalloweenForever = world.version >= 287 && reader.readBoolean()
    data.forceXMasForever = world.version >= 287 && reader.readBoolean()
    data.vampireSeed = world.version >= 288 && reader.readBoolean()
    data.infectedSeed = world.version >= 296 && reader.readBoolean()
    data.tempMeteorShowerCount = Number(world.version >= 291 && reader.readInt32())
    data.tempCoinRain = Number(world.version >= 291 && reader.readInt32())
    data.teamBasedSpawnsSeed = world.version >= 297 && reader.readBoolean()
    data.extraSpawnPoints =
      world.version >= 297
        ? reader.readArray(reader.readInt8(), (): Position => ({ x: reader.readInt16(), y: reader.readInt16() }))
        : []
    data.dualDungeonsSeed = world.version >= 304 && reader.readBoolean()
    data.manifest = world.version >= 299 ? reader.readString() : ''

    return data
  }

  public save(saver: BinarySaver, data: HeaderData, world: WorldProperties): void {
    saver.saveString(data.mapName)
    saver.saveString(data.seedText)
    saver.saveBytes(data.worldGeneratorVersion)
    saver.saveBytes(data.guid)
    saver.saveInt32(data.worldId)
    saver.saveInt32(data.leftWorld)
    saver.saveInt32(data.rightWorld)
    saver.saveInt32(data.topWorld)
    saver.saveInt32(data.bottomWorld)
    saver.saveInt32(data.maxTilesY)
    saver.saveInt32(data.maxTilesX)
    if (world.version >= 225) {
      saver.saveInt32(data.gameMode)
      saver.saveBoolean(data.drunkWorld)

      if (world.version >= 227) {
        saver.saveBoolean(data.getGoodWorld)
      }
      if (world.version >= 238) {
        saver.saveBoolean(data.getTenthAnniversaryWorld)
      }
      if (world.version >= 239) {
        saver.saveBoolean(data.dontStarveWorld)
      }
      if (world.version >= 241) {
        saver.saveBoolean(data.notTheBeesWorld)
      }
      if (world.version >= 249) {
        saver.saveBoolean(data.remixWorld)
      }
      if (world.version >= 266) {
        saver.saveBoolean(data.noTrapsWorld)
      }
      if (world.version >= 267) {
        saver.saveBoolean(data.zenithWorld)
      }
    } else {
      saver.saveBoolean(data.expertMode)
    }
    saver.saveBytes(data.creationTime)
    saver.saveUInt8(data.moonType)
    saver.saveInt32(data.treeX[0])
    saver.saveInt32(data.treeX[1])
    saver.saveInt32(data.treeX[2])
    saver.saveInt32(data.treeStyle[0])
    saver.saveInt32(data.treeStyle[1])
    saver.saveInt32(data.treeStyle[2])
    saver.saveInt32(data.treeStyle[3])
    saver.saveInt32(data.caveBackX[0])
    saver.saveInt32(data.caveBackX[1])
    saver.saveInt32(data.caveBackX[2])
    saver.saveInt32(data.caveBackStyle[0])
    saver.saveInt32(data.caveBackStyle[1])
    saver.saveInt32(data.caveBackStyle[2])
    saver.saveInt32(data.caveBackStyle[3])
    saver.saveInt32(data.iceBackStyle)
    saver.saveInt32(data.jungleBackStyle)
    saver.saveInt32(data.hellBackStyle)
    saver.saveInt32(data.spawnTileX)
    saver.saveInt32(data.spawnTileY)
    saver.saveFloat64(data.worldSurface)
    saver.saveFloat64(data.rockLayer)
    saver.saveFloat64(data.tempTime)
    saver.saveBoolean(data.tempDayTime)
    saver.saveInt32(data.tempMoonPhase)
    saver.saveBoolean(data.tempBloodMoon)
    saver.saveBoolean(data.tempEclipse)
    saver.saveInt32(data.dungeonX)
    saver.saveInt32(data.dungeonY)
    saver.saveBoolean(data.crimson)
    saver.saveBoolean(data.downedBoss1)
    saver.saveBoolean(data.downedBoss2)
    saver.saveBoolean(data.downedBoss3)
    saver.saveBoolean(data.downedQueenBee)
    saver.saveBoolean(data.downedMechBoss1)
    saver.saveBoolean(data.downedMechBoss2)
    saver.saveBoolean(data.downedMechBoss3)
    saver.saveBoolean(data.downedMechBossAny)
    saver.saveBoolean(data.downedPlantBoss)
    saver.saveBoolean(data.downedGolemBoss)
    saver.saveBoolean(data.downedSlimeKing)
    saver.saveBoolean(data.savedGoblin)
    saver.saveBoolean(data.savedWizard)
    saver.saveBoolean(data.savedMech)
    saver.saveBoolean(data.downedGoblins)
    saver.saveBoolean(data.downedClown)
    saver.saveBoolean(data.downedFrost)
    saver.saveBoolean(data.downedPirates)
    saver.saveBoolean(data.shadowOrbSmashed)
    saver.saveBoolean(data.spawnMeteor)
    saver.saveUInt8(data.shadowOrbCount)
    saver.saveInt32(data.altarCount)
    saver.saveBoolean(data.hardMode)
    if (world.version >= 257) {
      saver.saveBoolean(data.afterPartyOfDoom)
    }
    saver.saveInt32(data.invasionDelay)
    saver.saveInt32(data.invasionSize)
    saver.saveInt32(data.invasionType)
    saver.saveFloat64(data.invasionX)
    saver.saveFloat64(data.slimeRainTime)
    saver.saveUInt8(data.sundialCooldown)
    saver.saveBoolean(data.tempRaining)
    saver.saveInt32(data.tempRainTime)
    saver.saveFloat32(data.tempMaxRain)
    saver.saveInt32(data.oreTier1)
    saver.saveInt32(data.oreTier2)
    saver.saveInt32(data.oreTier3)
    saver.saveUInt8(data.setBG0)
    saver.saveUInt8(data.setBG1)
    saver.saveUInt8(data.setBG2)
    saver.saveUInt8(data.setBG3)
    saver.saveUInt8(data.setBG4)
    saver.saveUInt8(data.setBG5)
    saver.saveUInt8(data.setBG6)
    saver.saveUInt8(data.setBG7)
    saver.saveInt32(data.cloudBGActive)
    saver.saveInt16(data.numClouds)
    saver.saveFloat32(data.windSpeed)
    saver.saveInt32(data.anglerWhoFinishedToday.length)
    data.anglerWhoFinishedToday.forEach((e: any) => saver.saveString(e))
    saver.saveBoolean(data.savedAngler)
    saver.saveInt32(data.anglerQuest)
    saver.saveBoolean(data.savedStylist)
    saver.saveBoolean(data.savedTaxCollector)
    if (world.version >= 225) {
      saver.saveBoolean(data.savedGolfer)
    }
    saver.saveInt32(data.invasionSizeStart)
    saver.saveInt32(data.tempCultistDelay)
    saver.saveInt16(data.killCount.length)
    data.killCount.forEach((e: any) => saver.saveInt32(e))
    saver.saveBoolean(data.fastForwardTimeToDawn)
    saver.saveBoolean(data.downedFishron)
    saver.saveBoolean(data.downedMartians)
    saver.saveBoolean(data.downedAncientCultist)
    saver.saveBoolean(data.downedMoonlord)
    saver.saveBoolean(data.downedHalloweenKing)
    saver.saveBoolean(data.downedHalloweenTree)
    saver.saveBoolean(data.downedChristmasIceQueen)
    saver.saveBoolean(data.downedChristmasSantank)
    saver.saveBoolean(data.downedChristmasTree)
    saver.saveBoolean(data.downedTowerSolar)
    saver.saveBoolean(data.downedTowerVortex)
    saver.saveBoolean(data.downedTowerNebula)
    saver.saveBoolean(data.downedTowerStardust)
    saver.saveBoolean(data.TowerActiveSolar)
    saver.saveBoolean(data.TowerActiveVortex)
    saver.saveBoolean(data.TowerActiveNebula)
    saver.saveBoolean(data.TowerActiveStardust)
    saver.saveBoolean(data.LunarApocalypseIsUp)
    saver.saveBoolean(data.tempPartyManual)
    saver.saveBoolean(data.tempPartyGenuine)
    saver.saveInt32(data.tempPartyCooldown)
    saver.saveInt32(data.tempPartyCelebratingNPCs.length)
    data.tempPartyCelebratingNPCs.forEach((e: any) => saver.saveInt32(e))
    saver.saveBoolean(data.Temp_Sandstorm_Happening)
    saver.saveInt32(data.Temp_Sandstorm_TimeLeft)
    saver.saveFloat32(data.Temp_Sandstorm_Severity)
    saver.saveFloat32(data.Temp_Sandstorm_IntendedSeverity)
    saver.saveBoolean(data.savedBartender)
    saver.saveBoolean(data.DD2Event_DownedInvasionT1)
    saver.saveBoolean(data.DD2Event_DownedInvasionT2)
    saver.saveBoolean(data.DD2Event_DownedInvasionT3)

    if (world.version >= 225) {
      saver.saveUInt8(data.setBG8)
      saver.saveUInt8(data.setBG9)
      saver.saveUInt8(data.setBG10)
      saver.saveUInt8(data.setBG11)
      saver.saveUInt8(data.setBG12)

      saver.saveBoolean(data.combatBookWasUsed)
      saver.saveInt32(data.lanternNightCooldown)
      saver.saveBoolean(data.lanternNightGenuine)
      saver.saveBoolean(data.lanternNightManual)
      saver.saveBoolean(data.lanternNightNextNightIsGenuine)

      saver.saveInt32(data.treeTopsVariations.length)
      data.treeTopsVariations.forEach((e: any) => saver.saveInt32(e))

      saver.saveBoolean(data.forceHalloweenForToday)
      saver.saveBoolean(data.forceXMasForToday)

      saver.saveInt32(data.savedOreTierCopper)
      saver.saveInt32(data.savedOreTierIron)
      saver.saveInt32(data.savedOreTierSilver)
      saver.saveInt32(data.savedOreTierGold)

      saver.saveBoolean(data.boughtCat)
      saver.saveBoolean(data.boughtDog)
      saver.saveBoolean(data.boughtBunny)

      saver.saveBoolean(data.downedEmpressOfLight)
      saver.saveBoolean(data.downedQueenSlime)
    }

    if (world.version >= 240) {
      saver.saveBoolean(data.downedDeerclops)
    }

    if (world.version >= 269) {
      saver.saveBoolean(data.unlockedSlimeBlueSpawn)
      saver.saveBoolean(data.unlockedMerchantSpawn)
      saver.saveBoolean(data.unlockedDemolitionistSpawn)
      saver.saveBoolean(data.unlockedPartyGirlSpawn)
      saver.saveBoolean(data.unlockedDyeTraderSpawn)
      saver.saveBoolean(data.unlockedTruffleSpawn)
      saver.saveBoolean(data.unlockedArmsDealerSpawn)
      saver.saveBoolean(data.unlockedNurseSpawn)
      saver.saveBoolean(data.unlockedPrincessSpawn)
      saver.saveBoolean(data.combatBookVolumeTwoWasUsed)
      saver.saveBoolean(data.peddlersSatchelWasUsed)
      saver.saveBoolean(data.unlockedSlimeGreenSpawn)
      saver.saveBoolean(data.unlockedSlimeOldSpawn)
      saver.saveBoolean(data.unlockedSlimePurpleSpawn)
      saver.saveBoolean(data.unlockedSlimeRainbowSpawn)
      saver.saveBoolean(data.unlockedSlimeRedSpawn)
      saver.saveBoolean(data.unlockedSlimeYellowSpawn)
      saver.saveBoolean(data.unlockedSlimeCopperSpawn)
      saver.saveBoolean(data.fastForwardTimeToDusk)
      saver.saveUInt8(data.moondialCooldown)
    }
  }
}
