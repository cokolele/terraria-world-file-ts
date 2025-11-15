import FileFormatHeaderIO from './section/FileFormatHeader'
import HeaderIO from './section/Header'
import WorldTilesIO from './section/WorldTiles'

import type BinaryReader from './BinaryReader'
import type { WorldProperties } from './FileReader'
import type BinarySaver from './BinarySaver'

const sections = {
  fileFormatHeader: new FileFormatHeaderIO(),
  header: new HeaderIO(),
  worldTiles: new WorldTilesIO(),
} as const

export namespace Section {
  export type Name = keyof typeof sections
  export type Data<T extends Name> = (typeof sections)[T]['data']
  export type DataMap = { [K in Name]: Data<K> }

  export interface IO<T extends Name = any> {
    data: Data<T>
    parse(reader: BinaryReader, world: WorldProperties): this
    save(saver: BinarySaver, world: WorldProperties): number
  }
}

export default sections as { [K in Section.Name]: Section.IO<K> }
