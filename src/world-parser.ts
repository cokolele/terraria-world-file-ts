import { fileReader, fileReaderBrowser, fileReaderNative, fileReaderOptions } from "./file-reader.js"
import { Tile, Section } from "./types"

interface parserOptions extends fileReaderOptions {
    ignorePointers?: boolean
    dataRecovery?: boolean
    sections?: Section[]
}

const defaultParserOptions: parserOptions = {
    ignorePointers: false,
    dataRecovery: false
}

export { parserOptions }

export default class {
    options: parserOptions
    private reader: fileReader
    private world: any
    private sections: {[key in Section]: () => any} = {
        fileFormatHeader: this.parseFileFormatHeader,
        header: this.parseHeader,
        tiles: this.parseWorldTiles,
        chests: this.parseChests,
        signs: this.parseSigns,
        NPCs: this.parseNPCs,
        tileEntities: this.parseTileEntities,
        weightedPressurePlates: this.parseWeightedPressurePlates,
        rooms: this.parseTownManager,
        bestiary: this.parseBestiary,
        creativePowers: this.parseCreativePowers,
        footer: this.parseFooter
    }

    constructor(options?: parserOptions) {
        this.options = {
            ...defaultParserOptions,
            ...options
        }
    }

    loadFile(file: File | Blob | string): Promise<this> {
        return new Promise<this>(async resolve => {
            if (typeof file === "string") {
                this.reader = await new fileReaderNative(this.options as fileReaderOptions).loadFile(file)
            } else {
                this.reader = await new fileReaderBrowser(this.options as fileReaderOptions).loadFile(file)
            }

            resolve(this)
        })
    }

    loadBuffer(buffer: ArrayBuffer | Buffer): this {
        if (buffer instanceof Buffer) {
            this.reader = new fileReaderNative(this.options as fileReaderOptions).loadBuffer(buffer)
        } else {
            this.reader = new fileReaderBrowser(this.options as fileReaderOptions).loadBuffer(buffer)
        }

        return this
    }

    parse(options?: parserOptions) {
        this.options = this.reader.options = {
            ...defaultParserOptions,
            ...options
        }

        let sectionsToParse = []

        if (this.options.dataRecovery) {
            sectionsToParse = Object.keys(this.sections) as Section[]
            this.options.ignoreBounds = this.options.ignorePointers = true
        } else if (!this.options.sections) {
            sectionsToParse = Object.keys(this.sections) as Section[]
        } else {
            sectionsToParse = this.options.sections
        }

        this.world = this.parseNecessaryData()

        if (this.world.version < 225) {
            delete this.sections.bestiary
            delete this.sections.creativePowers
        }

        let data: any = {}

        for (let [section, parseFunction] of Object.entries(this.sections)) {
            if (this.options.sections.includes(section as Section)) {
                let sectionIndex: number = Object.keys(this.sections).indexOf(section)

                if (!this.options.dataRecovery) {
                    this.reader.jumpTo(this.world.pointers[sectionIndex])
                }
                
                data[section] = parseFunction.call(this)

                if (!this.options.ignorePointers &&
                    this.reader.offset != this.world.pointers[sectionIndex + 1] &&
                    this.reader.offset != this.reader.fileByteLength
                ) {
                    console.log(this.reader.offset, this.world.pointers[sectionIndex + 1])
                    throw new Error("Bad " + section + " section end offset")
                }
            }
        }

        return data
    }

    private parseNecessaryData(): { [key: string]: any } {
        let version: number,
            magicNumber: string,
            fileType: number,
            pointers: number[],
            importants: boolean[],
            height: number,
            width: number

        this.reader.jumpTo(0)

        try {
            version = this.reader.readInt32()
            magicNumber = this.reader.readString(7)
            fileType = this.reader.readUInt8()
            this.reader.skipBytes(12)
            pointers = [0]

            for (let i = this.reader.readInt16(); i > 0; i--) {
                pointers.push(this.reader.readInt32())
            }

            importants = this.reader.readBits(this.reader.readInt16())
            this.reader.readString()
            this.reader.readString()
            this.reader.skipBytes(44)
            height = this.reader.readInt32()
            width = this.reader.readInt32()
        } catch (e) {
            throw new Error("Invalid file")
        }

        this.reader.jumpTo(0)

        if (magicNumber != "relogic" || fileType != 2)
            throw new Error("Invalid file type")

        if (version < 194)
            throw new Error("Maps older than version 1.3.5.3 are not supported")

        return {
            version,
            pointers,
            importants,
            width,
            height
        }
    }

    private parseFileFormatHeader() {
        let data: any = {}

        data.version = this.reader.readInt32()
        data.magicNumber = this.reader.readString(7)
        data.fileType = this.reader.readUInt8()
        data.revision = this.reader.readUInt32()
        data.favorite = this.reader.readBoolean()
        this.reader.skipBytes(7)
        data.pointers = []

        for (let i = this.reader.readInt16(); i > 0; i--) {
            data.pointers.push(this.reader.readInt32())
        }

        data.importants = this.reader.readBits(this.reader.readInt16())

        return data
    }

    private parseHeader() {
        let data: any = {}

        data.mapName = this.reader.readString()
        data.seedText = this.reader.readString()
        data.worldGeneratorVersion = this.reader.readUInt64()
        data.guidString = this.reader.readGuid()
        data.worldId = this.reader.readInt32()
        data.leftWorld = this.reader.readInt32()
        data.rightWorld = this.reader.readInt32()
        data.topWorld = this.reader.readInt32()
        data.bottomWorld = this.reader.readInt32()
        data.maxTilesY = this.reader.readInt32()
        data.maxTilesX = this.reader.readInt32()

        if (this.world.version >= 225) {
            data.gameMode = this.reader.readInt32()
            data.drunkWorld = this.reader.readBoolean()

            if (this.world.version >= 227)
                data.getGoodWorld = this.reader.readBoolean()
            if (this.world.version >= 238)
                data.getTenthAnniversaryWorld = this.reader.readBoolean()
            if (this.world.version >= 239)
                data.dontStarveWorld = this.reader.readBoolean()
            if (this.world.version >= 241)
                data.notTheBeesWorld = this.reader.readBoolean()
            if (this.world.version >= 249)
                data.remixWorld = this.reader.readBoolean()
            if (this.world.version >= 266)
                data.noTrapsWorld = this.reader.readBoolean()
            if (this.world.version >= 267)
                data.zenithWorld = this.reader.readBoolean()

        } else {
            data.expertMode = this.reader.readBoolean()
        }

        data.creationTime = this.reader.readBytes(8)
        data.moonType = this.reader.readUInt8()

        data.treeX = []
        data.treeX[0] = this.reader.readInt32()
        data.treeX[1] = this.reader.readInt32()
        data.treeX[2] = this.reader.readInt32()

        data.treeStyle = []
        data.treeStyle[0] = this.reader.readInt32()
        data.treeStyle[1] = this.reader.readInt32()
        data.treeStyle[2] = this.reader.readInt32()
        data.treeStyle[3] = this.reader.readInt32()

        data.caveBackX = []
        data.caveBackX[0] = this.reader.readInt32()
        data.caveBackX[1] = this.reader.readInt32()
        data.caveBackX[2] = this.reader.readInt32()

        data.caveBackStyle = []
        data.caveBackStyle[0] = this.reader.readInt32()
        data.caveBackStyle[1] = this.reader.readInt32()
        data.caveBackStyle[2] = this.reader.readInt32()
        data.caveBackStyle[3] = this.reader.readInt32()

        data.iceBackStyle = this.reader.readInt32()
        data.jungleBackStyle = this.reader.readInt32()
        data.hellBackStyle = this.reader.readInt32()
        data.spawnTileX = this.reader.readInt32()
        data.spawnTileY = this.reader.readInt32()
        data.worldSurface = this.reader.readFloat64()
        data.rockLayer = this.reader.readFloat64()
        data.tempTime = this.reader.readFloat64()
        data.tempDayTime = this.reader.readBoolean()
        data.tempMoonPhase = this.reader.readInt32()
        data.tempBloodMoon = this.reader.readBoolean()
        data.tempEclipse = this.reader.readBoolean()
        data.dungeonX = this.reader.readInt32()
        data.dungeonY = this.reader.readInt32()
        data.crimson = this.reader.readBoolean()
        data.downedBoss1 = this.reader.readBoolean()
        data.downedBoss2 = this.reader.readBoolean()
        data.downedBoss3 = this.reader.readBoolean()
        data.downedQueenBee = this.reader.readBoolean()
        data.downedMechBoss1 = this.reader.readBoolean()
        data.downedMechBoss2 = this.reader.readBoolean()
        data.downedMechBoss3 = this.reader.readBoolean()
        data.downedMechBossAny = this.reader.readBoolean()
        data.downedPlantBoss = this.reader.readBoolean()
        data.downedGolemBoss = this.reader.readBoolean()
        data.downedSlimeKing = this.reader.readBoolean()
        data.savedGoblin = this.reader.readBoolean()
        data.savedWizard = this.reader.readBoolean()
        data.savedMech = this.reader.readBoolean()
        data.downedGoblins = this.reader.readBoolean()
        data.downedClown = this.reader.readBoolean()
        data.downedFrost = this.reader.readBoolean()
        data.downedPirates = this.reader.readBoolean()
        data.shadowOrbSmashed = this.reader.readBoolean()
        data.spawnMeteor = this.reader.readBoolean()
        data.shadowOrbCount = this.reader.readUInt8()
        data.altarCount = this.reader.readInt32()
        data.hardMode = this.reader.readBoolean()
        data.afterPartyOfDoom = this.world.version >= 257 ? this.reader.readBoolean() : false
        data.invasionDelay = this.reader.readInt32()
        data.invasionSize = this.reader.readInt32()
        data.invasionType = this.reader.readInt32()
        data.invasionX = this.reader.readFloat64()
        data.slimeRainTime = this.reader.readFloat64()
        data.sundialCooldown = this.reader.readUInt8()
        data.tempRaining = this.reader.readBoolean()
        data.tempRainTime = this.reader.readInt32()
        data.tempMaxRain = this.reader.readFloat32()
        data.oreTier1 = this.reader.readInt32()
        data.oreTier2 = this.reader.readInt32()
        data.oreTier3 = this.reader.readInt32()
        data.setBG0 = this.reader.readUInt8()
        data.setBG1 = this.reader.readUInt8()
        data.setBG2 = this.reader.readUInt8()
        data.setBG3 = this.reader.readUInt8()
        data.setBG4 = this.reader.readUInt8()
        data.setBG5 = this.reader.readUInt8()
        data.setBG6 = this.reader.readUInt8()
        data.setBG7 = this.reader.readUInt8()
        data.cloudBGActive = this.reader.readInt32()
        data.numClouds = this.reader.readInt16()
        data.windSpeed = this.reader.readFloat32()

        data.anglerWhoFinishedToday = []
        for (let i = this.reader.readInt32(); i > 0; --i)
            data.anglerWhoFinishedToday.push(this.reader.readString())

        data.savedAngler = this.reader.readBoolean()
        data.anglerQuest = this.reader.readInt32()
        data.savedStylist = this.reader.readBoolean()
        data.savedTaxCollector = this.reader.readBoolean()
        if (this.world.version >= 225)
            data.savedGolfer = this.reader.readBoolean()

        data.invasionSizeStart = this.reader.readInt32()
        data.tempCultistDelay = this.reader.readInt32()

        data.killCount = []
        for (let i = this.reader.readInt16(); i > 0; i--)
            data.killCount.push(this.reader.readInt32())

        data.fastForwardTimeToDawn = this.reader.readBoolean()
        data.downedFishron = this.reader.readBoolean()
        data.downedMartians = this.reader.readBoolean()
        data.downedAncientCultist = this.reader.readBoolean()
        data.downedMoonlord = this.reader.readBoolean()
        data.downedHalloweenKing = this.reader.readBoolean()
        data.downedHalloweenTree = this.reader.readBoolean()
        data.downedChristmasIceQueen = this.reader.readBoolean()
        data.downedChristmasSantank = this.reader.readBoolean()
        data.downedChristmasTree = this.reader.readBoolean()
        data.downedTowerSolar = this.reader.readBoolean()
        data.downedTowerVortex = this.reader.readBoolean()
        data.downedTowerNebula = this.reader.readBoolean()
        data.downedTowerStardust = this.reader.readBoolean()
        data.TowerActiveSolar = this.reader.readBoolean()
        data.TowerActiveVortex = this.reader.readBoolean()
        data.TowerActiveNebula = this.reader.readBoolean()
        data.TowerActiveStardust = this.reader.readBoolean()
        data.LunarApocalypseIsUp = this.reader.readBoolean()
        data.tempPartyManual = this.reader.readBoolean()
        data.tempPartyGenuine = this.reader.readBoolean()
        data.tempPartyCooldown = this.reader.readInt32()

        data.tempPartyCelebratingNPCs = []
        for (let i = this.reader.readInt32(); i > 0; i--)
            data.tempPartyCelebratingNPCs.push(this.reader.readInt32())

        data.Temp_Sandstorm_Happening = this.reader.readBoolean()
        data.Temp_Sandstorm_TimeLeft = this.reader.readInt32()
        data.Temp_Sandstorm_Severity = this.reader.readFloat32()
        data.Temp_Sandstorm_IntendedSeverity = this.reader.readFloat32()
        data.savedBartender = this.reader.readBoolean()
        data.DD2Event_DownedInvasionT1 = this.reader.readBoolean()
        data.DD2Event_DownedInvasionT2 = this.reader.readBoolean()
        data.DD2Event_DownedInvasionT3 = this.reader.readBoolean()

        if (this.world.version >= 225) {
            data.setBG8 = this.reader.readUInt8()
            data.setBG9 = this.reader.readUInt8()
            data.setBG10 = this.reader.readUInt8()
            data.setBG11 = this.reader.readUInt8()
            data.setBG12 = this.reader.readUInt8()

            data.combatBookWasUsed = this.reader.readBoolean()
            data.lanternNightCooldown = this.reader.readInt32()
            data.lanternNightGenuine = this.reader.readBoolean()
            data.lanternNightManual = this.reader.readBoolean()
            data.lanternNightNextNightIsGenuine = this.reader.readBoolean()

            data.treeTopsVariations = []
            for (let i = this.reader.readInt32(); i > 0; i--)
                data.treeTopsVariations.push(this.reader.readInt32())

            data.forceHalloweenForToday = this.reader.readBoolean()
            data.forceXMasForToday = this.reader.readBoolean()

            data.savedOreTierCopper = this.reader.readInt32()
            data.savedOreTierIron = this.reader.readInt32()
            data.savedOreTierSilver = this.reader.readInt32()
            data.savedOreTierGold = this.reader.readInt32()

            data.boughtCat = this.reader.readBoolean()
            data.boughtDog = this.reader.readBoolean()
            data.boughtBunny = this.reader.readBoolean()

            data.downedEmpressOfLight = this.reader.readBoolean()
            data.downedQueenSlime = this.reader.readBoolean()
        }

        if (this.world.version >= 240) {
            data.downedDeerclops = this.reader.readBoolean()
        }

        if (this.world.version >= 269) {
            data.unlockedSlimeBlueSpawn = this.reader.readBoolean()
            data.unlockedMerchantSpawn = this.reader.readBoolean()
            data.unlockedDemolitionistSpawn = this.reader.readBoolean()
            data.unlockedPartyGirlSpawn = this.reader.readBoolean()
            data.unlockedDyeTraderSpawn = this.reader.readBoolean()
            data.unlockedTruffleSpawn = this.reader.readBoolean()
            data.unlockedArmsDealerSpawn = this.reader.readBoolean()
            data.unlockedNurseSpawn = this.reader.readBoolean()
            data.unlockedPrincessSpawn = this.reader.readBoolean()
            data.combatBookVolumeTwoWasUsed = this.reader.readBoolean()
            data.peddlersSatchelWasUsed = this.reader.readBoolean()
            data.unlockedSlimeGreenSpawn = this.reader.readBoolean()
            data.unlockedSlimeOldSpawn = this.reader.readBoolean()
            data.unlockedSlimePurpleSpawn = this.reader.readBoolean()
            data.unlockedSlimeRainbowSpawn = this.reader.readBoolean()
            data.unlockedSlimeRedSpawn = this.reader.readBoolean()
            data.unlockedSlimeYellowSpawn = this.reader.readBoolean()
            data.unlockedSlimeCopperSpawn = this.reader.readBoolean()
            data.fastForwardTimeToDusk = this.reader.readBoolean()
            data.moondialCooldown = this.reader.readUInt8()
        }

        return data
    }

    private parseWorldTiles() {
        let data: any[],
            RLE: number
        
        data = new Array(this.world.width)
        for (let x = 0; x < this.world.width; x++) {
            data[x] = new Array(this.world.height)
            for (let y = 0; y < this.world.height; y++) {
                [data[x][y], RLE] = this.parseTileData()

                while (RLE > 0) {
                    data[x][y + 1] = data[x][y]
                    y++
                    RLE--
                }
            }
        }

        return data
    }

    private parseTileData(): [Tile: any, RLE: number] {
        let tile: Tile = {}

        const flags1 = this.reader.readUInt8()
        let flags2, flags3, flags4

        if (flags1 & 1) {
            flags2 = this.reader.readUInt8()

            if (flags2 & 1) {
                flags3 = this.reader.readUInt8()

                if (flags3 & 1) {
                    flags4 = this.reader.readUInt8()
                }
            }
        }

        if (flags1 > 1) {

            if (flags1 & 2) {
                if (flags1 & 32)
                    tile.blockId = this.reader.readUInt16()
                else
                    tile.blockId = this.reader.readUInt8()

                if (this.world.importants[tile.blockId]) {
                    tile.frameX = this.reader.readInt16()
                    tile.frameY = this.reader.readInt16()
                    if (tile.blockId == 144)
                        tile.frameY = 0
                }

                if (flags3 & 8)
                    tile.blockColor = this.reader.readUInt8()
            }

            if (flags1 & 4) {
                tile.wallId = this.reader.readUInt8()

                if (flags3 & 16)
                    tile.wallColor = this.reader.readUInt8()
            }

            const liquidType = (flags1 & 24) >> 3
            if (liquidType) {
                tile.liquidAmount = this.reader.readUInt8()

                if (flags3 & 128)
                    tile.liquidType = "shimmer"
                else
                    switch (liquidType) {
                        case 1: tile.liquidType = "water"; break
                        case 2: tile.liquidType = "lava"; break
                        case 3: tile.liquidType = "honey"; break
                    }
            }
        }

        if (flags2) {
            if (flags2 & 2)
                tile.wireRed = true
            if (flags2 & 4)
                tile.wireBlue = true
            if (flags2 & 8)
                tile.wireGreen = true

            const slope = (flags2 & 112) >> 4
            if (slope)
                switch (slope) {
                    case 1: tile.slope = "half"; break
                    case 2: tile.slope = "TR"; break
                    case 3: tile.slope = "TL"; break
                    case 4: tile.slope = "BR"; break
                    case 5: tile.slope = "BL"; break
                }

            if (flags3) {
                if (flags3 & 2)
                    tile.actuator = true
                if (flags3 & 4)
                    tile.actuated = true
                if (flags3 & 32)
                    tile.wireYellow = true
                if (flags3 & 64)
                    tile.wallId = (this.reader.readUInt8() << 8) | tile.wallId

                if (flags4) {
                    if (flags4 & 2)
                        tile.invisibleBlock = true
                    if (flags4 & 4)
                        tile.invisibleWall = true
                    if (flags4 & 8)
                        tile.fullBrightBlock = true
                    if (flags4 & 16)
                        tile.fullBrightWall = true
                }
            }
        }

        let RLE: number

        if (flags1 & 64) {
            RLE = this.reader.readUInt8()
        } else if (flags1 & 128) {
            RLE = this.reader.readInt16()
        }

        return [tile, RLE]
    }

    private parseChests() {
        let data: any = []

        const chestsCount = this.reader.readInt16()
        this.reader.skipBytes(2); //chestsSpace, constant 40, readInt16

        for (let i = 0; i < chestsCount; i++) {
            data[i] = {
                position: {
                    x: this.reader.readInt32(),
                    y: this.reader.readInt32()
                },
                name: this.reader.readString()
            }

            if (data[i].name == "")
                delete data[i].name

            for (let j = 0, stack; j < 40; j++) {
                stack = this.reader.readInt16()
                if (stack == 0)
                    continue

                if (!data[i].items)
                    data[i].items = []

                data[i].items[j] = {
                    stack,
                    id: this.reader.readInt32(),
                    prefix: this.reader.readUInt8()
                }
            }
        }

        return data
    }

    private parseSigns() {
        let data = []

        const signsCount = this.reader.readInt16(); //use world.signs.count instead
        for (let i = 0; i < signsCount; i++)
            data[i] = {
                text: this.reader.readString(),
                position: {
                    x: this.reader.readInt32(),
                    y: this.reader.readInt32()
                }
            }

        return data
    }

    private parseNPCs() {
        let data: any = []

        if (this.world.version > 268)
            for (let i = this.reader.readInt32(); i > 0; i--)
                data[this.reader.readInt32()] = {
                    shimmered: true
                }

        let i = 0
        for (; this.reader.readBoolean(); i++) {
            data[i] = {
                ...data[i],

                townNPC: true,
                id: this.reader.readInt32(),
                name: this.reader.readString(),
                position: {
                    x: this.reader.readFloat32(),
                    y: this.reader.readFloat32()
                },
                homeless: this.reader.readBoolean(),
                homePosition: {
                    x: this.reader.readInt32(),
                    y: this.reader.readInt32()
                }
            }

            if (this.world.version >= 225 && this.reader.readBoolean())
                data[i].variationIndex = this.reader.readInt32()
        }

        for (; this.reader.readBoolean(); i++)
            data[i] = {
                pillar: true,
                id: this.reader.readInt32(),
                position: {
                    x: this.reader.readFloat32(),
                    y: this.reader.readFloat32()
                }
            }

        return data
    }

    private parseTileEntities() {
        let data: any = []

        const tileEntitiesCount = this.reader.readInt32(); //use world.tileEntities.length instead
        for (let i = 0; i < tileEntitiesCount; i++) {
            data[i] = {
                type: this.reader.readUInt8(),
                id: this.reader.readInt32(),
                position: {
                    x: this.reader.readInt16(),
                    y: this.reader.readInt16()
                }
            }

            switch (data[i].type) {
                //dummy
                case 0:
                    data[i].targetDummy = {
                        npc: this.reader.readInt16()
                    }
                    break
                //item frame
                case 1:
                    data[i].itemFrame = {
                        itemId: this.reader.readInt16(),
                        prefix: this.reader.readUInt8(),
                        stack: this.reader.readInt16()
                    }
                    break
                //logic sensor
                case 2:
                    data[i].logicSensor = {
                        logicCheck: this.reader.readUInt8(),
                        on: this.reader.readBoolean()
                    }
                    break
                //display doll
                case 3:
                    data[i].displayDoll = {
                        items: [],
                        dyes: []
                    }

                    var items = this.reader.readBits(8)
                    var dyes = this.reader.readBits(8)

                    for (let j = 0; j < 8; j++)
                        if (items[j]) {
                            if (!data[i].displayDoll.items)
                                data[i].displayDoll.items = []
                            data[i].displayDoll.items[j] = {
                                itemId: this.reader.readInt16(),
                                prefix: this.reader.readUInt8(),
                                stack: this.reader.readInt16()
                            }
                        }
                    for (let j = 0; j < 8; j++)
                        if (dyes[j]) {
                            if (!data[i].displayDoll.dyes)
                                data[i].displayDoll.dyes = []
                            data[i].displayDoll.dyes[j] = {
                                itemId: this.reader.readInt16(),
                                prefix: this.reader.readUInt8(),
                                stack: this.reader.readInt16()
                            }
                        }

                    break
                //weapons rack
                case 4:
                    data[i].weaponsRack = {
                        itemId: this.reader.readInt16(),
                        prefix: this.reader.readUInt8(),
                        stack: this.reader.readInt16()
                    }
                    break
                //hat rack
                case 5:
                    data[i].hatRack = {
                        items: [],
                        dyes: []
                    }

                    var items = this.reader.readBits(4)
                    var dyes = items.splice(2, 4)

                    for (let j = 0; j < 2; j++)
                        if (items[j]) {
                            if (!data[i].hatRack.items)
                                data[i].hatRack.items = []
                            data[i].hatRack.items[j] = {
                                itemId: this.reader.readInt16(),
                                prefix: this.reader.readUInt8(),
                                stack: this.reader.readInt16()
                            }
                        }
                    for (let j = 0; j < 2; j++)
                        if (dyes[j]) {
                            if (!data[i].hatRack.dyes)
                                data[i].hatRack.dyes = []
                            data[i].hatRack.dyes[j] = {
                                itemId: this.reader.readInt16(),
                                prefix: this.reader.readUInt8(),
                                stack: this.reader.readInt16()
                            }
                        }

                    break
                //food platter
                case 6:
                    data[i].foodPlatter = {
                        itemId: this.reader.readInt16(),
                        prefix: this.reader.readUInt8(),
                        stack: this.reader.readInt16()
                    }
                    break
                //teleportation pylon
                case 7:
                    data[i].teleportationPylon = true
                    break
            }
        }

        return data
    }

    private parseWeightedPressurePlates() {
        let data = []

        const pressurePlatesCount = this.reader.readInt32(); //use world.weightedPressurePlates.length instead
        for (let i = 0; i < pressurePlatesCount; i++)
            data[i] = {
                position: {
                    x: this.reader.readInt32(),
                    y: this.reader.readInt32()
                }
            }

        return data
    }

    private parseTownManager() {
        let data = []

        const roomsCount = this.reader.readInt32(); //use world.townManager.length
        for (let i = 0; i < roomsCount; i++)
            data[i] = {
                NPCId: this.reader.readInt32(),
                position: {
                    x: this.reader.readInt32(),
                    y: this.reader.readInt32()
                }
            }

        return data
    }

    private parseBestiary() {
        let data: any = {}

        data.NPCKills = {}
        for (let i = this.reader.readInt32(); i > 0; --i)
            data.NPCKills[this.reader.readString()] = this.reader.readInt32()

        data.NPCSights = []
        for (let i = this.reader.readInt32(); i > 0; --i)
            data.NPCSights.push(this.reader.readString())

        data.NPCChats = []
        for (let i = this.reader.readInt32(); i > 0; --i)
            data.NPCChats.push(this.reader.readString())

        return data
    }

    private parseCreativePowers() {
        let data: any = {}

        this.reader.skipBytes(3)
        data.freezeTime = this.reader.readBoolean()

        this.reader.skipBytes(3)
        data.modifyTimeRate = this.reader.readFloat32()

        this.reader.skipBytes(3)
        data.freezeRainPower = this.reader.readBoolean()

        this.reader.skipBytes(3)
        data.freezeWindDirectionAndStrength = this.reader.readBoolean()

        this.reader.skipBytes(3)
        data.difficultySliderPower = this.reader.readFloat32()

        this.reader.skipBytes(3)
        data.stopBiomeSpreadPower = this.reader.readBoolean()

        this.reader.skipBytes(1)

        return data
    }

    private parseFooter() {
        return {
            signoff1: this.reader.readBoolean(),
            signoff2: this.reader.readString(),
            signoff3: this.reader.readInt32()
        }
    }
}