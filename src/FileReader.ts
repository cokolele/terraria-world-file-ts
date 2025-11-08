import BinaryReader from './BinaryReader'
import sections from './Section'
import TerrariaWorldParserError from './TerrariaWorldParserError'

import type { Section } from './Section'

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

export default class FileReader {
  private reader = new BinaryReader()

  private defaultOptions: Required<Options> = {
    ignorePointers: false,
    dataRecovery: false,
    sections: Object.keys(sections) as Section.Name[],
    ignoreBounds: false,
    progressCallback: null as any,
  }

  private ignorePointers = this.defaultOptions.ignorePointers
  private dataRecovery = this.defaultOptions.dataRecovery
  private selectedSections = this.defaultOptions.sections

  private setOptions(options: Options = {}): void {
    this.ignorePointers = options.ignorePointers ?? this.defaultOptions.ignorePointers
    this.dataRecovery = options.dataRecovery ?? this.defaultOptions.dataRecovery
    this.selectedSections = options.sections ?? this.defaultOptions.sections
    this.reader.ignoreBounds = options.ignoreBounds ?? this.defaultOptions.ignoreBounds
    this.reader.progressCallback = options.progressCallback ?? this.defaultOptions.progressCallback
  }

  public async loadFile(loader: (path: string) => Promise<ArrayBufferLike>, path: string): Promise<this> {
    this.reader.loadBuffer(await loader(path))

    return this
  }

  public async loadBuffer(buffer: ArrayBufferLike): Promise<this> {
    this.reader.loadBuffer(buffer)

    return this
  }

  public parse<T extends Section.Name[]>(options?: Partial<Options<T>>): { [K in T[number]]: Section.Data<K> } {
    const world = this.parseWorldProperties()
    this.setOptions(options)

    let data = {} as { [K in T[number]]: Section.Data<K> }

    for (let [sectionName, sectionParser] of Object.entries(sections) as [T[number], Section.Parser<T[number]>][]) {
      if (
        !this.selectedSections.includes(sectionName) ||
        (world.version < 225 && ['bestiary', 'creativePowers'].includes(sectionName))
      ) {
        continue
      }

      const sectionIndex = Object.keys(sections).indexOf(sectionName)

      this.reader.jumpTo(world.pointers[sectionIndex])
      data[sectionName] = sectionParser(this.reader, world)

      if (
        !this.ignorePointers &&
        this.reader.getPosition() != world.pointers[sectionIndex + 1] &&
        !this.reader.isFinished()
      ) {
        throw new TerrariaWorldParserError(`Section ${sectionName} parsing ended at wrong point`)
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
      throw new TerrariaWorldParserError('Invalid file')
    }

    if (data.magicNumber != 'relogic' || data.fileType != 2) {
      throw new TerrariaWorldParserError('Wrong file type')
    }

    if (data.version < 194) {
      throw new TerrariaWorldParserError('Map file is too old')
    }

    return data
  }
}
