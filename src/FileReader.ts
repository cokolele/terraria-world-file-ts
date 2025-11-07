import BinaryReader from './BinaryReader'
import sections from './sections'
import TerrariaWorldParserError from './TerrariaWorldParserError'

import type { Options, Section, WorldProperties } from './types'

export default class FileReader {
  private reader = new BinaryReader()

  private defaultOptions: Options = {
    ignorePointers: false,
    dataRecovery: false,
    sections: Object.keys(sections) as Section.Name[],
    ignoreBounds: false,
    progressCallback: null as any,
  }

  private ignorePointers = this.defaultOptions.ignorePointers
  private dataRecovery = this.defaultOptions.dataRecovery
  private selectedSections = this.defaultOptions.sections

  public async loadFile(loader: (path: string) => Promise<ArrayBufferLike>, path: string): Promise<this> {
    this.reader.loadBuffer(await loader(path))

    return this
  }

  public async loadBuffer(buffer: ArrayBufferLike): Promise<this> {
    this.reader.loadBuffer(buffer)

    return this
  }

  public parse(options?: Partial<Options>): Partial<Section.Map> {
    const world = this.parseWorldProperties()
    this.setOptions(options)

    let data: Partial<Section.Map> = {}

    if (world.version < 225) {
      this.selectedSections = this.selectedSections.filter(
        (section) => section != 'bestiary' && section != 'creativePowers',
      )
    }

    for (let [sectionName, parseFunction] of Object.entries(sections) as [Section.Name, Section.ParserFunction][]) {
      if (!this.selectedSections.includes(sectionName as Section.Name)) {
        continue
      }

      const sectionIndex = Object.keys(sections).indexOf(sectionName)

      this.reader.jumpTo(world.pointers[sectionIndex])
      data[sectionName] = parseFunction(this.reader, world) as any

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

  private setOptions(options: Partial<Options> = {}): void {
    this.ignorePointers = options.ignorePointers ?? this.defaultOptions.ignorePointers
    this.dataRecovery = options.dataRecovery ?? this.defaultOptions.dataRecovery
    this.selectedSections = options.sections ?? this.defaultOptions.sections
    this.reader.ignoreBounds = options.ignoreBounds ?? this.defaultOptions.ignoreBounds
    this.reader.progressCallback = options.progressCallback ?? this.defaultOptions.progressCallback
  }

  private parseWorldProperties(): WorldProperties {
    let data: any = {}

    try {
      this.reader.jumpTo(0)
      data.version = this.reader.readInt32()
      data.magicNumber = this.reader.readString(7)
      data.fileType = this.reader.readUInt8()
      this.reader.skipBytes(12)
      data.pointers = this.reader.readArray(this.reader.readInt16(), () => this.reader.readInt32())
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

    return {
      version: data.version,
      pointers: [0, ...data.pointers],
      importants: data.importants,
      height: data.height,
      width: data.width,
    }
  }
}
