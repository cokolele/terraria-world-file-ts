import BinarySaver from './BinarySaver'
import sections from './sections'

import type { WorldProperties } from './FileReader'
import type { Section } from './sections'

export default class FileSaver {
  private saver!: BinarySaver

  public save(world: Section.DataMap, progressCallback?: (percent: number) => void): ArrayBuffer {
    this.saver = new BinarySaver()
    this.saver.progressCallback = progressCallback

    const worldProperties: WorldProperties = {
      version: world.fileFormatHeader.version,
      pointers: world.fileFormatHeader.pointers,
      importants: world.fileFormatHeader.importants,
      height: world.header.maxTilesY,
      width: world.header.maxTilesX,
    }

    const pointers = (Object.entries(sections) as [Section.Name, Section.IO][]).reduce(
      (prev: number[], [sectionName, sectionIO]) => {
        if (worldProperties.version < 225 && ['bestiary', 'creativePowers'].includes(sectionName)) {
          return prev
        }

        sectionIO.data = world[sectionName]
        return [...prev, sectionIO.save(this.saver, worldProperties)]
      },
      [],
    )

    pointers.pop()
    while (pointers.length < 10) {
      pointers.push(0)
    }

    this.saver.jumpTo(24)
    this.saver.saveInt16(pointers.length)
    pointers.forEach((pointer) => this.saver.saveInt32(pointer))

    this.saver.trimEnd()
    return this.saver.getBuffer()
  }

  // saveChests() {
  //   const data = this.world.chests
  //
  //   this.saver.saveInt16(data.length)
  //   this.saver.saveInt16(40)
  //
  //   data.forEach((chest) => {
  //     this.saver.saveInt32(chest.position.x)
  //     this.saver.saveInt32(chest.position.y)
  //     if (chest.name) this.saver.saveString(chest.name)
  //     else this.saver.saveUInt8(0)
  //
  //     const chestItems = Array(40).fill(null)
  //     if (chest.items) {
  //       chest.items.forEach((item, i) => {
  //         chestItems[i] = item
  //       })
  //     }
  //
  //     chestItems.forEach((item) => {
  //       if (item === null) this.saver.saveInt16(0)
  //       else {
  //         this.saver.saveInt16(item.stack)
  //         this.saver.saveInt32(item.id)
  //         this.saver.saveUInt8(item.prefix)
  //       }
  //     })
  //   })
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveSigns() {
  //   const data = this.world.signs
  //
  //   this.saver.saveInt16(data.length)
  //
  //   data.forEach((sign) => {
  //     this.saver.saveString(sign.text)
  //     this.saver.saveInt32(sign.position.x)
  //     this.saver.saveInt32(sign.position.y)
  //   })
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveNPCs() {
  //   const data = this.world.NPCs
  //
  //   const shimmeredNPCs = data.filter((NPC) => NPC.shimmered)
  //   this.saver.saveInt32(shimmeredNPCs.length)
  //   shimmeredNPCs.forEach((NPC) => this.saver.saveInt32(NPC.id))
  //
  //   data.forEach((NPC) => {
  //     if (NPC.townNPC) {
  //       this.saver.saveBoolean(true)
  //       this.saver.saveInt32(NPC.id)
  //       this.saver.saveString(NPC.name)
  //       this.saver.saveFloat32(NPC.position.x)
  //       this.saver.saveFloat32(NPC.position.y)
  //       this.saver.saveBoolean(NPC.homeless)
  //       this.saver.saveInt32(NPC.homePosition.x)
  //       this.saver.saveInt32(NPC.homePosition.y)
  //
  //       if (this.world.fileFormatHeader.version >= 225) {
  //         if (NPC.variationIndex !== undefined) {
  //           this.saver.saveBitsByte([true])
  //           this.saver.saveInt32(NPC.variationIndex)
  //         } else this.saver.saveBitsByte([false])
  //       }
  //     }
  //   })
  //   this.saver.saveBoolean(false)
  //
  //   data.forEach((NPC) => {
  //     if (NPC.pillar) {
  //       this.saver.saveBoolean(true)
  //       this.saver.saveInt32(NPC.id)
  //       this.saver.saveFloat32(NPC.position.x)
  //       this.saver.saveFloat32(NPC.position.y)
  //     }
  //   })
  //   this.saver.saveBoolean(false)
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveTileEntities() {
  //   const data = this.world.tileEntities
  //
  //   this.saver.saveInt32(data.length)
  //
  //   data.forEach((tileEntity) => {
  //     if (tileEntity.targetDummy) this.saver.saveUInt8(0)
  //     else if (tileEntity.itemFrame) this.saver.saveUInt8(1)
  //     else if (tileEntity.logicSensor) this.saver.saveUInt8(2)
  //     else if (tileEntity.displayDoll) this.saver.saveUInt8(3)
  //     else if (tileEntity.weaponsRack) this.saver.saveUInt8(4)
  //     else if (tileEntity.hatRack) this.saver.saveUInt8(5)
  //     else if (tileEntity.foodPlatter) this.saver.saveUInt8(6)
  //     else if (tileEntity.teleportationPylon) this.saver.saveUInt8(7)
  //
  //     this.saver.saveInt32(tileEntity.id)
  //     this.saver.saveInt16(tileEntity.position.x)
  //     this.saver.saveInt16(tileEntity.position.y)
  //
  //     if (tileEntity.targetDummy) {
  //       this.saver.saveInt16(tileEntity.targetDummy.npc)
  //     } else if (tileEntity.itemFrame) {
  //       this.saver.saveInt16(tileEntity.itemFrame.itemId)
  //       this.saver.saveUInt8(tileEntity.itemFrame.prefix)
  //       this.saver.saveInt16(tileEntity.itemFrame.stack)
  //     } else if (tileEntity.logicSensor) {
  //       this.saver.saveUInt8(tileEntity.logicSensor.logicCheck)
  //       this.saver.saveBoolean(tileEntity.logicSensor.on)
  //     } else if (tileEntity.displayDoll) {
  //       let itemsBits = [],
  //         dyesBits = []
  //
  //       if (tileEntity.displayDoll.items)
  //         for (let i = 0; i < 8; i++) itemsBits[i] = tileEntity.displayDoll.items[i] ? true : false
  //       this.saver.saveBitsByte(itemsBits)
  //
  //       if (tileEntity.displayDoll.dyes)
  //         for (let i = 0; i < 8; i++) dyesBits[i] = tileEntity.displayDoll.dyes[i] ? true : false
  //       this.saver.saveBitsByte(dyesBits)
  //
  //       for (let j = 0; j < 8; j++)
  //         if (itemsBits[j]) {
  //           this.saver.saveInt16(tileEntity.displayDoll.items[j].itemId)
  //           this.saver.saveUInt8(tileEntity.displayDoll.items[j].prefix)
  //           this.saver.saveInt16(tileEntity.displayDoll.items[j].stack)
  //         }
  //
  //       for (let j = 0; j < 8; j++)
  //         if (dyesBits[j]) {
  //           this.saver.saveInt16(tileEntity.displayDoll.dyes[j].itemId)
  //           this.saver.saveUInt8(tileEntity.displayDoll.dyes[j].prefix)
  //           this.saver.saveInt16(tileEntity.displayDoll.dyes[j].stack)
  //         }
  //     } else if (tileEntity.weaponsRack) {
  //       this.saver.saveInt16(tileEntity.weaponsRack.itemId)
  //       this.saver.saveUInt8(tileEntity.weaponsRack.prefix)
  //       this.saver.saveInt16(tileEntity.weaponsRack.stack)
  //     } else if (tileEntity.hatRack) {
  //       let itemsBits = [],
  //         dyesBits = []
  //
  //       if (tileEntity.hatRack.items)
  //         for (let i = 0; i < 2; i++) itemsBits[i] = tileEntity.hatRack.items[i] ? true : false
  //
  //       if (tileEntity.hatRack.dyes) for (let i = 0; i < 2; i++) dyesBits[i] = tileEntity.hatRack.dyes[i] ? true : false
  //
  //       this.saver.saveBitsByte([...itemsBits, ...dyesBits])
  //
  //       for (let j = 0; j < 2; j++)
  //         if (itemsBits[j]) {
  //           this.saver.saveInt16(tileEntity.hatRack.items[j].itemId)
  //           this.saver.saveUInt8(tileEntity.hatRack.items[j].prefix)
  //           this.saver.saveInt16(tileEntity.hatRack.items[j].stack)
  //         }
  //
  //       for (let j = 0; j < 2; j++)
  //         if (dyesBits[j]) {
  //           this.saver.saveInt16(tileEntity.hatRack.dyes[j].itemId)
  //           this.saver.saveUInt8(tileEntity.hatRack.dyes[j].prefix)
  //           this.saver.saveInt16(tileEntity.hatRack.dyes[j].stack)
  //         }
  //     } else if (tileEntity.foodPlatter) {
  //       this.saver.saveInt16(tileEntity.foodPlatter.itemId)
  //       this.saver.saveUInt8(tileEntity.foodPlatter.prefix)
  //       this.saver.saveInt16(tileEntity.foodPlatter.stack)
  //     }
  //   })
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveWeightedPressurePlates() {
  //   const data = this.world.weightedPressurePlates
  //
  //   this.saver.saveInt32(data.length)
  //
  //   data.forEach((pressurePlate) => {
  //     this.saver.saveInt32(pressurePlate.position.x)
  //     this.saver.saveInt32(pressurePlate.position.y)
  //   })
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveTownManager() {
  //   const data = this.world.rooms
  //
  //   this.saver.saveInt32(data.length)
  //
  //   data.forEach((room) => {
  //     this.saver.saveInt32(room.NPCId)
  //     this.saver.saveInt32(room.position.x)
  //     this.saver.saveInt32(room.position.y)
  //   })
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveBestiary() {
  //   const data = this.world.bestiary
  //
  //   data.NPCKills = Object.entries(data.NPCKills)
  //
  //   this.saver.saveInt32(data.NPCKills.length)
  //   for (let i = 0; i < data.NPCKills.length; i++) {
  //     this.saver.saveString(data.NPCKills[i][0])
  //     this.saver.saveInt32(data.NPCKills[i][1])
  //   }
  //
  //   this.saver.saveInt32(data.NPCSights.length)
  //   for (let i = 0; i < data.NPCSights.length; i++) this.saver.saveString(data.NPCSights[i])
  //
  //   this.saver.saveInt32(data.NPCChats.length)
  //   for (let i = 0; i < data.NPCChats.length; i++) this.saver.saveString(data.NPCChats[i])
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveCreativePowers() {
  //   const creativePowers = this.world.creativePowers
  //
  //   this.saver.saveBoolean(true)
  //   this.saver.saveInt16(0)
  //   this.saver.saveBoolean(creativePowers.freezeTime)
  //
  //   this.saver.saveBoolean(true)
  //   this.saver.saveInt16(8)
  //   this.saver.saveFloat32(creativePowers.modifyTimeRate)
  //
  //   this.saver.saveBoolean(true)
  //   this.saver.saveInt16(9)
  //   this.saver.saveBoolean(creativePowers.freezeRainPower)
  //
  //   this.saver.saveBoolean(true)
  //   this.saver.saveInt16(10)
  //   this.saver.saveBoolean(creativePowers.freezeWindDirectionAndStrength)
  //
  //   this.saver.saveBoolean(true)
  //   this.saver.saveInt16(12)
  //   this.saver.saveFloat32(creativePowers.difficultySliderPower)
  //
  //   this.saver.saveBoolean(true)
  //   this.saver.saveInt16(13)
  //   this.saver.saveBoolean(creativePowers.stopBiomeSpreadPower)
  //
  //   this.saver.saveBoolean(false)
  //
  //   return this.saver.getPosition()
  // }
  //
  // saveFooter() {
  //   this.saver.saveBoolean(true)
  //   this.saver.saveString(this.world.header.mapName)
  //   this.saver.saveInt32(this.world.header.worldId)
  // }
}
