import {Section, WorldProperties} from "../types";
import BinaryReader from "../BinaryReader";

export default function parseHeader(reader: BinaryReader, world: WorldProperties): Section.Header {
  let data = {} as Section.Header;

  data.mapName = reader.readString();
  data.seedText = reader.readString();
  data.worldGeneratorVersion = reader.readBytes(8);
  data.guid = reader.readBytes(16);
  data.guidString = reader.readGuid(data.guid);
  data.worldId = reader.readInt32();
  data.leftWorld = reader.readInt32();
  data.rightWorld = reader.readInt32();
  data.topWorld = reader.readInt32();
  data.bottomWorld = reader.readInt32();
  data.maxTilesY = reader.readInt32();
  data.maxTilesX = reader.readInt32();

  if (world.version >= 225) {
    data.gameMode = reader.readInt32();
    data.drunkWorld = reader.readBoolean();

    if (world.version >= 227) {
      data.getGoodWorld = reader.readBoolean();
    }

    if (world.version >= 238) {
      data.getTenthAnniversaryWorld = reader.readBoolean();
    }

    if (world.version >= 239) {
      data.dontStarveWorld = reader.readBoolean();
    }

    if (world.version >= 241) {
      data.notTheBeesWorld = reader.readBoolean();
    }

    if (world.version >= 249) {
      data.remixWorld = reader.readBoolean();
    }

    if (world.version >= 266) {
      data.noTrapsWorld = reader.readBoolean();
    }

    if (world.version >= 267) {
      data.zenithWorld = reader.readBoolean();
    }
  } else {
    data.expertMode = reader.readBoolean();
  }

  data.creationTime = reader.readBytes(8);
  data.moonType = reader.readUInt8();

  data.treeX = [];
  data.treeX[0] = reader.readInt32();
  data.treeX[1] = reader.readInt32();
  data.treeX[2] = reader.readInt32();

  data.treeStyle = [];
  data.treeStyle[0] = reader.readInt32();
  data.treeStyle[1] = reader.readInt32();
  data.treeStyle[2] = reader.readInt32();
  data.treeStyle[3] = reader.readInt32();

  data.caveBackX = [];
  data.caveBackX[0] = reader.readInt32();
  data.caveBackX[1] = reader.readInt32();
  data.caveBackX[2] = reader.readInt32();

  data.caveBackStyle = [];
  data.caveBackStyle[0] = reader.readInt32();
  data.caveBackStyle[1] = reader.readInt32();
  data.caveBackStyle[2] = reader.readInt32();
  data.caveBackStyle[3] = reader.readInt32();

  data.iceBackStyle = reader.readInt32();
  data.jungleBackStyle = reader.readInt32();
  data.hellBackStyle = reader.readInt32();
  data.spawnTileX = reader.readInt32();
  data.spawnTileY = reader.readInt32();
  data.worldSurface = reader.readFloat64();
  data.rockLayer = reader.readFloat64();
  data.tempTime = reader.readFloat64();
  data.tempDayTime = reader.readBoolean();
  data.tempMoonPhase = reader.readInt32();
  data.tempBloodMoon = reader.readBoolean();
  data.tempEclipse = reader.readBoolean();
  data.dungeonX = reader.readInt32();
  data.dungeonY = reader.readInt32();
  data.crimson = reader.readBoolean();
  data.downedBoss1 = reader.readBoolean();
  data.downedBoss2 = reader.readBoolean();
  data.downedBoss3 = reader.readBoolean();
  data.downedQueenBee = reader.readBoolean();
  data.downedMechBoss1 = reader.readBoolean();
  data.downedMechBoss2 = reader.readBoolean();
  data.downedMechBoss3 = reader.readBoolean();
  data.downedMechBossAny = reader.readBoolean();
  data.downedPlantBoss = reader.readBoolean();
  data.downedGolemBoss = reader.readBoolean();
  data.downedSlimeKing = reader.readBoolean();
  data.savedGoblin = reader.readBoolean();
  data.savedWizard = reader.readBoolean();
  data.savedMech = reader.readBoolean();
  data.downedGoblins = reader.readBoolean();
  data.downedClown = reader.readBoolean();
  data.downedFrost = reader.readBoolean();
  data.downedPirates = reader.readBoolean();
  data.shadowOrbSmashed = reader.readBoolean();
  data.spawnMeteor = reader.readBoolean();
  data.shadowOrbCount = reader.readUInt8();
  data.altarCount = reader.readInt32();
  data.hardMode = reader.readBoolean();
  data.afterPartyOfDoom = world.version >= 257 ? reader.readBoolean() : false;
  data.invasionDelay = reader.readInt32();
  data.invasionSize = reader.readInt32();
  data.invasionType = reader.readInt32();
  data.invasionX = reader.readFloat64();
  data.slimeRainTime = reader.readFloat64();
  data.sundialCooldown = reader.readUInt8();
  data.tempRaining = reader.readBoolean();
  data.tempRainTime = reader.readInt32();
  data.tempMaxRain = reader.readFloat32();
  data.oreTier1 = reader.readInt32();
  data.oreTier2 = reader.readInt32();
  data.oreTier3 = reader.readInt32();
  data.setBG0 = reader.readUInt8();
  data.setBG1 = reader.readUInt8();
  data.setBG2 = reader.readUInt8();
  data.setBG3 = reader.readUInt8();
  data.setBG4 = reader.readUInt8();
  data.setBG5 = reader.readUInt8();
  data.setBG6 = reader.readUInt8();
  data.setBG7 = reader.readUInt8();
  data.cloudBGActive = reader.readInt32();
  data.numClouds = reader.readInt16();
  data.windSpeed = reader.readFloat32();

  data.anglerWhoFinishedToday = [];
  for (let i = reader.readInt32(); i > 0; --i) {
    data.anglerWhoFinishedToday.push(reader.readString());
  }

  data.savedAngler = reader.readBoolean();
  data.anglerQuest = reader.readInt32();
  data.savedStylist = reader.readBoolean();
  data.savedTaxCollector = reader.readBoolean();

  if (world.version >= 225) {
    data.savedGolfer = reader.readBoolean();
  }

  data.invasionSizeStart = reader.readInt32();
  data.tempCultistDelay = reader.readInt32();

  data.killCount = [];
  for (let i = reader.readInt16(); i > 0; i--) {
    data.killCount.push(reader.readInt32());
  }

  data.fastForwardTimeToDawn = reader.readBoolean();
  data.downedFishron = reader.readBoolean();
  data.downedMartians = reader.readBoolean();
  data.downedAncientCultist = reader.readBoolean();
  data.downedMoonlord = reader.readBoolean();
  data.downedHalloweenKing = reader.readBoolean();
  data.downedHalloweenTree = reader.readBoolean();
  data.downedChristmasIceQueen = reader.readBoolean();
  data.downedChristmasSantank = reader.readBoolean();
  data.downedChristmasTree = reader.readBoolean();
  data.downedTowerSolar = reader.readBoolean();
  data.downedTowerVortex = reader.readBoolean();
  data.downedTowerNebula = reader.readBoolean();
  data.downedTowerStardust = reader.readBoolean();
  data.TowerActiveSolar = reader.readBoolean();
  data.TowerActiveVortex = reader.readBoolean();
  data.TowerActiveNebula = reader.readBoolean();
  data.TowerActiveStardust = reader.readBoolean();
  data.LunarApocalypseIsUp = reader.readBoolean();
  data.tempPartyManual = reader.readBoolean();
  data.tempPartyGenuine = reader.readBoolean();
  data.tempPartyCooldown = reader.readInt32();

  data.tempPartyCelebratingNPCs = [];
  for (let i = reader.readInt32(); i > 0; i--) {
    data.tempPartyCelebratingNPCs.push(reader.readInt32());
  }

  data.Temp_Sandstorm_Happening = reader.readBoolean();
  data.Temp_Sandstorm_TimeLeft = reader.readInt32();
  data.Temp_Sandstorm_Severity = reader.readFloat32();
  data.Temp_Sandstorm_IntendedSeverity = reader.readFloat32();
  data.savedBartender = reader.readBoolean();
  data.DD2Event_DownedInvasionT1 = reader.readBoolean();
  data.DD2Event_DownedInvasionT2 = reader.readBoolean();
  data.DD2Event_DownedInvasionT3 = reader.readBoolean();

  if (world.version >= 225) {
    data.setBG8 = reader.readUInt8();
    data.setBG9 = reader.readUInt8();
    data.setBG10 = reader.readUInt8();
    data.setBG11 = reader.readUInt8();
    data.setBG12 = reader.readUInt8();

    data.combatBookWasUsed = reader.readBoolean();
    data.lanternNightCooldown = reader.readInt32();
    data.lanternNightGenuine = reader.readBoolean();
    data.lanternNightManual = reader.readBoolean();
    data.lanternNightNextNightIsGenuine = reader.readBoolean();

    data.treeTopsVariations = [];
    for (let i = reader.readInt32(); i > 0; i--) {
      data.treeTopsVariations.push(reader.readInt32());
    }

    data.forceHalloweenForToday = reader.readBoolean();
    data.forceXMasForToday = reader.readBoolean();

    data.savedOreTierCopper = reader.readInt32();
    data.savedOreTierIron = reader.readInt32();
    data.savedOreTierSilver = reader.readInt32();
    data.savedOreTierGold = reader.readInt32();

    data.boughtCat = reader.readBoolean();
    data.boughtDog = reader.readBoolean();
    data.boughtBunny = reader.readBoolean();

    data.downedEmpressOfLight = reader.readBoolean();
    data.downedQueenSlime = reader.readBoolean();
  }

  if (world.version >= 240) {
    data.downedDeerclops = reader.readBoolean();
  }

  if (world.version >= 269) {
    data.unlockedSlimeBlueSpawn = reader.readBoolean();
    data.unlockedMerchantSpawn = reader.readBoolean();
    data.unlockedDemolitionistSpawn = reader.readBoolean();
    data.unlockedPartyGirlSpawn = reader.readBoolean();
    data.unlockedDyeTraderSpawn = reader.readBoolean();
    data.unlockedTruffleSpawn = reader.readBoolean();
    data.unlockedArmsDealerSpawn = reader.readBoolean();
    data.unlockedNurseSpawn = reader.readBoolean();
    data.unlockedPrincessSpawn = reader.readBoolean();
    data.combatBookVolumeTwoWasUsed = reader.readBoolean();
    data.peddlersSatchelWasUsed = reader.readBoolean();
    data.unlockedSlimeGreenSpawn = reader.readBoolean();
    data.unlockedSlimeOldSpawn = reader.readBoolean();
    data.unlockedSlimePurpleSpawn = reader.readBoolean();
    data.unlockedSlimeRainbowSpawn = reader.readBoolean();
    data.unlockedSlimeRedSpawn = reader.readBoolean();
    data.unlockedSlimeYellowSpawn = reader.readBoolean();
    data.unlockedSlimeCopperSpawn = reader.readBoolean();
    data.fastForwardTimeToDusk = reader.readBoolean();
    data.moondialCooldown = reader.readUInt8();
  }

  return data;
}
