import type sections from './sections'
import type BinaryReader from './BinaryReader'

export type Options = {
  ignorePointers: boolean
  dataRecovery: boolean
  sections: Section.Name[]
  ignoreBounds: boolean
  progressCallback: (percent: number) => void
}

export type WorldProperties = {
  version: number
  pointers: number[]
  importants: boolean[]
  height: number
  width: number
}

export namespace Section {
  export type Name = keyof typeof sections

  export type Map = {
    [K in Name]: ReturnType<(typeof sections)[K]>
  }

  export type ParserFunction<K extends Name = Name> = (reader: BinaryReader, world: WorldProperties) => Map[K]
}
