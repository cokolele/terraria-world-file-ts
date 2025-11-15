import BinaryReader from './BinaryReader'
import sections from './sections'
import TerrariaWorldFileError from './TerrariaWorldFileError'

import type { Section } from './sections'

export type Options<T extends Section.Name[] = Section.Name[]> = {
  ignorePointers?: boolean
  dataRecovery?: boolean
  sections?: T
  ignoreBounds?: boolean
  progressCallback?: (percent: number) => void
}

export type WorldProperties = {
  version: number
  pointers: number[]
  importants: boolean[]
  height: number
  width: number
}

type SelectedDataMap<T extends Section.Name[]> = { [K in T[number]]: Section.Data<K> }

export default class FileReader {
  private reader!: BinaryReader
  private ignorePointers!: boolean
  private dataRecovery!: boolean
  private selectedSections!: Section.Name[]

  private defaultOptions: Required<Options> = {
    ignorePointers: false,
    dataRecovery: false,
    sections: Object.keys(sections) as Section.Name[],
    ignoreBounds: false,
    progressCallback: null as any,
  }

  private setOptions(options: Options = {}): void {
    this.ignorePointers = options.ignorePointers ?? this.defaultOptions.ignorePointers
    this.dataRecovery = options.dataRecovery ?? this.defaultOptions.dataRecovery
    this.selectedSections = options.sections ?? this.defaultOptions.sections
    this.reader.ignoreBounds = options.ignoreBounds ?? this.defaultOptions.ignoreBounds
    this.reader.progressCallback = options.progressCallback ?? this.defaultOptions.progressCallback
  }

  public async loadFile(loader: (path: string) => Promise<ArrayBuffer>, path: string): Promise<this> {
    this.reader = new BinaryReader().loadBuffer(await loader(path))

    return this
  }

  public async loadBuffer(buffer: ArrayBuffer): Promise<this> {
    this.reader = new BinaryReader().loadBuffer(buffer)

    return this
  }

  public parse<T extends Section.Name[]>(options?: Options<T>): SelectedDataMap<T> {
    const world = this.parseWorldProperties()
    this.setOptions(options)

    let data = {} as SelectedDataMap<T>

    for (let [sectionName, sectionIO] of Object.entries(sections) as [T[number], Section.IO<T[number]>][]) {
      if (
        !this.selectedSections.includes(sectionName) ||
        (world.version < 225 && ['bestiary', 'creativePowers'].includes(sectionName))
      ) {
        continue
      }

      const sectionIndex = Object.keys(sections).indexOf(sectionName)

      this.reader.jumpTo(world.pointers[sectionIndex])
      data[sectionName] = sectionIO.parse(this.reader, world).data

      if (
        !this.ignorePointers &&
        this.reader.getPosition() != world.pointers[sectionIndex + 1] &&
        !this.reader.isFinished()
      ) {
        throw new TerrariaWorldFileError(`Section ${sectionName} parsing ended at wrong point`)
      }
    }

    return data
  }

  private parseWorldProperties(): WorldProperties {
    let data = {} as WorldProperties & {
      magicNumber: string
      fileType: number
    }

    try {
      this.reader.jumpTo(0)
      data.version = this.reader.readInt32()
      data.magicNumber = this.reader.readString(7)
      data.fileType = this.reader.readUInt8()
      this.reader.skipBytes(12)
      data.pointers = [0, ...this.reader.readArray(this.reader.readInt16(), () => this.reader.readInt32())]
      data.importants = this.reader.readBits(this.reader.readInt16())
      this.reader.readString()
      this.reader.readString()
      this.reader.skipBytes(44)
      data.height = this.reader.readInt32()
      data.width = this.reader.readInt32()
      this.reader.jumpTo(0)
    } catch (e) {
      throw new TerrariaWorldFileError('Invalid file')
    }

    if (data.magicNumber != 'relogic' || data.fileType != 2) {
      throw new TerrariaWorldFileError('Wrong file type')
    }

    if (data.version < 194) {
      throw new TerrariaWorldFileError('Map file is too old')
    }

    return data
  }
}
