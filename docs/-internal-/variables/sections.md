[**terraria-world-file**](../../README.md)

***

[terraria-world-file](../../globals.md) / [\<internal\>](../README.md) / sections

# Variable: sections

> `const` **sections**: `object`

Defined in: [src/sections/index.ts:14](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/sections/index.ts#L14)

## Type Declaration

### bestiary()

> `readonly` **bestiary**: (`reader`) => [`Bestiary`](../../type-aliases/Bestiary.md) = `parseBestiary`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

[`Bestiary`](../../type-aliases/Bestiary.md)

### chests()

> `readonly` **chests**: (`reader`) => [`Chest`](../../type-aliases/Chest.md)[] = `parseChests`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

[`Chest`](../../type-aliases/Chest.md)[]

### creativePowers()

> `readonly` **creativePowers**: (`reader`) => `object` = `parseCreativePowers`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

`object`

### fileFormatHeader()

> `readonly` **fileFormatHeader**: (`reader`) => `object` = `parseFileFormatHeader`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

`object`

##### favorite

> **favorite**: `boolean`

##### fileType

> **fileType**: `number`

##### importants

> **importants**: `boolean`[]

##### magicNumber

> **magicNumber**: `string`

##### pointers

> **pointers**: `number`[]

##### revision

> **revision**: `number`

##### version

> **version**: `number`

### footer()

> `readonly` **footer**: (`reader`) => `object` = `parseFooter`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

`object`

##### signoff1

> **signoff1**: `boolean`

##### signoff2

> **signoff2**: `string`

##### signoff3

> **signoff3**: `number`

### header()

> `readonly` **header**: (`reader`, `world`) => `object` = `parseHeader`

#### Parameters

##### reader

[`default`](../classes/default.md)

##### world

[`WorldProperties`](../../type-aliases/WorldProperties.md)

#### Returns

`object`

##### afterPartyOfDoom

> **afterPartyOfDoom**: `boolean`

##### altarCount

> **altarCount**: `number`

##### anglerQuest

> **anglerQuest**: `number`

##### anglerWhoFinishedToday

> **anglerWhoFinishedToday**: `string`[]

##### bottomWorld

> **bottomWorld**: `number`

##### boughtBunny

> **boughtBunny**: `boolean`

##### boughtCat

> **boughtCat**: `boolean`

##### boughtDog

> **boughtDog**: `boolean`

##### caveBackStyle

> **caveBackStyle**: `number`[]

##### caveBackX

> **caveBackX**: `number`[]

##### cloudBGActive

> **cloudBGActive**: `number`

##### combatBookVolumeTwoWasUsed

> **combatBookVolumeTwoWasUsed**: `boolean`

##### combatBookWasUsed

> **combatBookWasUsed**: `boolean`

##### creationTime

> **creationTime**: `Uint8Array`\<[`ArrayBufferLike`](../type-aliases/ArrayBufferLike.md)\>

##### crimson

> **crimson**: `boolean`

##### DD2Event\_DownedInvasionT1

> **DD2Event\_DownedInvasionT1**: `boolean`

##### DD2Event\_DownedInvasionT2

> **DD2Event\_DownedInvasionT2**: `boolean`

##### DD2Event\_DownedInvasionT3

> **DD2Event\_DownedInvasionT3**: `boolean`

##### dontStarveWorld

> **dontStarveWorld**: `boolean`

##### downedAncientCultist

> **downedAncientCultist**: `boolean`

##### downedBoss1

> **downedBoss1**: `boolean`

##### downedBoss2

> **downedBoss2**: `boolean`

##### downedBoss3

> **downedBoss3**: `boolean`

##### downedChristmasIceQueen

> **downedChristmasIceQueen**: `boolean`

##### downedChristmasSantank

> **downedChristmasSantank**: `boolean`

##### downedChristmasTree

> **downedChristmasTree**: `boolean`

##### downedClown

> **downedClown**: `boolean`

##### downedDeerclops

> **downedDeerclops**: `boolean`

##### downedEmpressOfLight

> **downedEmpressOfLight**: `boolean`

##### downedFishron

> **downedFishron**: `boolean`

##### downedFrost

> **downedFrost**: `boolean`

##### downedGoblins

> **downedGoblins**: `boolean`

##### downedGolemBoss

> **downedGolemBoss**: `boolean`

##### downedHalloweenKing

> **downedHalloweenKing**: `boolean`

##### downedHalloweenTree

> **downedHalloweenTree**: `boolean`

##### downedMartians

> **downedMartians**: `boolean`

##### downedMechBoss1

> **downedMechBoss1**: `boolean`

##### downedMechBoss2

> **downedMechBoss2**: `boolean`

##### downedMechBoss3

> **downedMechBoss3**: `boolean`

##### downedMechBossAny

> **downedMechBossAny**: `boolean`

##### downedMoonlord

> **downedMoonlord**: `boolean`

##### downedPirates

> **downedPirates**: `boolean`

##### downedPlantBoss

> **downedPlantBoss**: `boolean`

##### downedQueenBee

> **downedQueenBee**: `boolean`

##### downedQueenSlime

> **downedQueenSlime**: `boolean`

##### downedSlimeKing

> **downedSlimeKing**: `boolean`

##### downedTowerNebula

> **downedTowerNebula**: `boolean`

##### downedTowerSolar

> **downedTowerSolar**: `boolean`

##### downedTowerStardust

> **downedTowerStardust**: `boolean`

##### downedTowerVortex

> **downedTowerVortex**: `boolean`

##### drunkWorld

> **drunkWorld**: `boolean`

##### dungeonX

> **dungeonX**: `number`

##### dungeonY

> **dungeonY**: `number`

##### expertMode

> **expertMode**: `boolean`

##### fastForwardTimeToDawn

> **fastForwardTimeToDawn**: `boolean`

##### fastForwardTimeToDusk

> **fastForwardTimeToDusk**: `boolean`

##### forceHalloweenForToday

> **forceHalloweenForToday**: `boolean`

##### forceXMasForToday

> **forceXMasForToday**: `boolean`

##### gameMode

> **gameMode**: [`GameMode`](../../enumerations/GameMode.md)

##### getGoodWorld

> **getGoodWorld**: `boolean`

##### getTenthAnniversaryWorld

> **getTenthAnniversaryWorld**: `boolean`

##### guid

> **guid**: `Uint8Array`\<[`ArrayBufferLike`](../type-aliases/ArrayBufferLike.md)\>

##### hardMode

> **hardMode**: `boolean`

##### hellBackStyle

> **hellBackStyle**: `number`

##### iceBackStyle

> **iceBackStyle**: `number`

##### invasionDelay

> **invasionDelay**: `number`

##### invasionSize

> **invasionSize**: `number`

##### invasionSizeStart

> **invasionSizeStart**: `number`

##### invasionType

> **invasionType**: `number`

##### invasionX

> **invasionX**: `number`

##### jungleBackStyle

> **jungleBackStyle**: `number`

##### killCount

> **killCount**: `number`[]

##### lanternNightCooldown

> **lanternNightCooldown**: `number`

##### lanternNightGenuine

> **lanternNightGenuine**: `boolean`

##### lanternNightManual

> **lanternNightManual**: `boolean`

##### lanternNightNextNightIsGenuine

> **lanternNightNextNightIsGenuine**: `boolean`

##### leftWorld

> **leftWorld**: `number`

##### LunarApocalypseIsUp

> **LunarApocalypseIsUp**: `boolean`

##### mapName

> **mapName**: `string`

##### maxTilesX

> **maxTilesX**: `number`

##### maxTilesY

> **maxTilesY**: `number`

##### moondialCooldown

> **moondialCooldown**: `number`

##### moonType

> **moonType**: `number`

##### noTrapsWorld

> **noTrapsWorld**: `boolean`

##### notTheBeesWorld

> **notTheBeesWorld**: `boolean`

##### numClouds

> **numClouds**: `number`

##### oreTier1

> **oreTier1**: `number`

##### oreTier2

> **oreTier2**: `number`

##### oreTier3

> **oreTier3**: `number`

##### peddlersSatchelWasUsed

> **peddlersSatchelWasUsed**: `boolean`

##### remixWorld

> **remixWorld**: `boolean`

##### rightWorld

> **rightWorld**: `number`

##### rockLayer

> **rockLayer**: `number`

##### savedAngler

> **savedAngler**: `boolean`

##### savedBartender

> **savedBartender**: `boolean`

##### savedGoblin

> **savedGoblin**: `boolean`

##### savedGolfer

> **savedGolfer**: `boolean`

##### savedMech

> **savedMech**: `boolean`

##### savedOreTierCopper

> **savedOreTierCopper**: `number`

##### savedOreTierGold

> **savedOreTierGold**: `number`

##### savedOreTierIron

> **savedOreTierIron**: `number`

##### savedOreTierSilver

> **savedOreTierSilver**: `number`

##### savedStylist

> **savedStylist**: `boolean`

##### savedTaxCollector

> **savedTaxCollector**: `boolean`

##### savedWizard

> **savedWizard**: `boolean`

##### seedText

> **seedText**: `string`

##### setBG0

> **setBG0**: `number`

##### setBG1

> **setBG1**: `number`

##### setBG10

> **setBG10**: `number`

##### setBG11

> **setBG11**: `number`

##### setBG12

> **setBG12**: `number`

##### setBG2

> **setBG2**: `number`

##### setBG3

> **setBG3**: `number`

##### setBG4

> **setBG4**: `number`

##### setBG5

> **setBG5**: `number`

##### setBG6

> **setBG6**: `number`

##### setBG7

> **setBG7**: `number`

##### setBG8

> **setBG8**: `number`

##### setBG9

> **setBG9**: `number`

##### shadowOrbCount

> **shadowOrbCount**: `number`

##### shadowOrbSmashed

> **shadowOrbSmashed**: `boolean`

##### slimeRainTime

> **slimeRainTime**: `number`

##### spawnMeteor

> **spawnMeteor**: `boolean`

##### spawnTileX

> **spawnTileX**: `number`

##### spawnTileY

> **spawnTileY**: `number`

##### sundialCooldown

> **sundialCooldown**: `number`

##### Temp\_Sandstorm\_Happening

> **Temp\_Sandstorm\_Happening**: `boolean`

##### Temp\_Sandstorm\_IntendedSeverity

> **Temp\_Sandstorm\_IntendedSeverity**: `number`

##### Temp\_Sandstorm\_Severity

> **Temp\_Sandstorm\_Severity**: `number`

##### Temp\_Sandstorm\_TimeLeft

> **Temp\_Sandstorm\_TimeLeft**: `number`

##### tempBloodMoon

> **tempBloodMoon**: `boolean`

##### tempCultistDelay

> **tempCultistDelay**: `number`

##### tempDayTime

> **tempDayTime**: `boolean`

##### tempEclipse

> **tempEclipse**: `boolean`

##### tempMaxRain

> **tempMaxRain**: `number`

##### tempMoonPhase

> **tempMoonPhase**: `number`

##### tempPartyCelebratingNPCs

> **tempPartyCelebratingNPCs**: `number`[]

##### tempPartyCooldown

> **tempPartyCooldown**: `number`

##### tempPartyGenuine

> **tempPartyGenuine**: `boolean`

##### tempPartyManual

> **tempPartyManual**: `boolean`

##### tempRaining

> **tempRaining**: `boolean`

##### tempRainTime

> **tempRainTime**: `number`

##### tempTime

> **tempTime**: `number`

##### topWorld

> **topWorld**: `number`

##### TowerActiveNebula

> **TowerActiveNebula**: `boolean`

##### TowerActiveSolar

> **TowerActiveSolar**: `boolean`

##### TowerActiveStardust

> **TowerActiveStardust**: `boolean`

##### TowerActiveVortex

> **TowerActiveVortex**: `boolean`

##### treeStyle

> **treeStyle**: `number`[]

##### treeTopsVariations

> **treeTopsVariations**: `number`[]

##### treeX

> **treeX**: `number`[]

##### unlockedArmsDealerSpawn

> **unlockedArmsDealerSpawn**: `boolean`

##### unlockedDemolitionistSpawn

> **unlockedDemolitionistSpawn**: `boolean`

##### unlockedDyeTraderSpawn

> **unlockedDyeTraderSpawn**: `boolean`

##### unlockedMerchantSpawn

> **unlockedMerchantSpawn**: `boolean`

##### unlockedNurseSpawn

> **unlockedNurseSpawn**: `boolean`

##### unlockedPartyGirlSpawn

> **unlockedPartyGirlSpawn**: `boolean`

##### unlockedPrincessSpawn

> **unlockedPrincessSpawn**: `boolean`

##### unlockedSlimeBlueSpawn

> **unlockedSlimeBlueSpawn**: `boolean`

##### unlockedSlimeCopperSpawn

> **unlockedSlimeCopperSpawn**: `boolean`

##### unlockedSlimeGreenSpawn

> **unlockedSlimeGreenSpawn**: `boolean`

##### unlockedSlimeOldSpawn

> **unlockedSlimeOldSpawn**: `boolean`

##### unlockedSlimePurpleSpawn

> **unlockedSlimePurpleSpawn**: `boolean`

##### unlockedSlimeRainbowSpawn

> **unlockedSlimeRainbowSpawn**: `boolean`

##### unlockedSlimeRedSpawn

> **unlockedSlimeRedSpawn**: `boolean`

##### unlockedSlimeYellowSpawn

> **unlockedSlimeYellowSpawn**: `boolean`

##### unlockedTruffleSpawn

> **unlockedTruffleSpawn**: `boolean`

##### windSpeed

> **windSpeed**: `number`

##### worldGeneratorVersion

> **worldGeneratorVersion**: `Uint8Array`\<[`ArrayBufferLike`](../type-aliases/ArrayBufferLike.md)\>

##### worldId

> **worldId**: `number`

##### worldSurface

> **worldSurface**: `number`

##### zenithWorld

> **zenithWorld**: `boolean`

### NPCs()

> `readonly` **NPCs**: (`reader`, `world`) => ([`Pillar`](../../interfaces/Pillar.md) \| [`NPC`](../../interfaces/NPC.md))[] = `parseNPCs`

#### Parameters

##### reader

[`default`](../classes/default.md)

##### world

[`WorldProperties`](../../type-aliases/WorldProperties.md)

#### Returns

([`Pillar`](../../interfaces/Pillar.md) \| [`NPC`](../../interfaces/NPC.md))[]

### signs()

> `readonly` **signs**: (`reader`) => [`Sign`](../../type-aliases/Sign.md)[] = `parseSigns`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

[`Sign`](../../type-aliases/Sign.md)[]

### tileEntities()

> `readonly` **tileEntities**: (`reader`) => [`TileEntity`](../../interfaces/TileEntity.md)[] = `parseTileEntities`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

[`TileEntity`](../../interfaces/TileEntity.md)[]

### tiles()

> `readonly` **tiles**: (`reader`, `world`) => [`Tile`](../../type-aliases/Tile.md)[][] = `parseWorldTiles`

#### Parameters

##### reader

[`default`](../classes/default.md)

##### world

[`WorldProperties`](../../type-aliases/WorldProperties.md)

#### Returns

[`Tile`](../../type-aliases/Tile.md)[][]

### townManager()

> `readonly` **townManager**: (`reader`) => [`TownRoom`](../../type-aliases/TownRoom.md)[] = `parseTownManager`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

[`TownRoom`](../../type-aliases/TownRoom.md)[]

### weightedPressurePlates()

> `readonly` **weightedPressurePlates**: (`reader`) => [`WeightedPressurePlate`](../../type-aliases/WeightedPressurePlate.md)[] = `parseWeightedPressurePlates`

#### Parameters

##### reader

[`default`](../classes/default.md)

#### Returns

[`WeightedPressurePlate`](../../type-aliases/WeightedPressurePlate.md)[]
