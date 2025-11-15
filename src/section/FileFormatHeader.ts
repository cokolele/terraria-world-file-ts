import type BinaryReader from '../BinaryReader'
import type { WorldProperties } from '../FileReader'
import type BinarySaver from '../BinarySaver'
import type { Section } from '../sections'

export type FileFormatHeader = typeof FileFormatHeaderData

class FileFormatHeaderData {
  public version!: number
  public magicNumber!: 'relogic'
  public fileType!: 2
  public revision!: number
  public favorite!: boolean
  public pointers!: number[]
  public importants!: boolean[]
}

export default class FileFormatHeaderIO implements Section.IO {
  public data!: FileFormatHeaderData

  public parse(reader: BinaryReader): this {
    this.data = new FileFormatHeaderData()

    this.data.version = reader.readInt32()
    this.data.magicNumber = reader.readString(7) as 'relogic'
    this.data.fileType = reader.readUInt8() as 2
    this.data.revision = reader.readUInt32()
    this.data.favorite = Boolean(reader.readInt64())
    this.data.pointers = reader.readArray(reader.readInt16(), () => reader.readInt32())
    this.data.importants = reader.readBits(reader.readUInt16())

    return this
  }

  public save(saver: BinarySaver, world: WorldProperties): number {
    saver.saveInt32(this.data.version)
    saver.saveString('relogic', false)
    saver.saveUInt8(this.data.fileType)
    saver.saveUInt32(this.data.revision)
    saver.saveInt64(BigInt(this.data.favorite))
    saver.skipBytes(world.version >= 225 ? 46 : 42)
    saver.saveUInt16(this.data.importants.length)
    saver.saveBits(this.data.importants)

    return saver.getPosition()
  }
}
