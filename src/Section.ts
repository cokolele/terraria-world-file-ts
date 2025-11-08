import parseFileFormatHeader from './parsers/fileFormatHeader'
import parseHeader from './parsers/header'
import parseWorldTiles from './parsers/worldTiles'
import parseChests from './parsers/chests'
import parseSigns from './parsers/signs'
import parseNPCs from './parsers/NPCs'
import parseTileEntities from './parsers/tileEntities'
import parseWeightedPressurePlates from './parsers/weightedPressurePlates'
import parseTownManager from './parsers/townManager'
import parseBestiary from './parsers/bestiary'
import parseCreativePowers from './parsers/creativePowers'
import parseFooter from './parsers/footer'

import type BinaryReader from './BinaryReader'
import type { WorldProperties } from './FileReader'

const sections = {
  fileFormatHeader: parseFileFormatHeader,
  header: parseHeader,
  tiles: parseWorldTiles,
  chests: parseChests,
  signs: parseSigns,
  NPCs: parseNPCs,
  tileEntities: parseTileEntities,
  weightedPressurePlates: parseWeightedPressurePlates,
  townManager: parseTownManager,
  bestiary: parseBestiary,
  creativePowers: parseCreativePowers,
  footer: parseFooter,
} as const

export namespace Section {
  export type Name = keyof typeof sections
  export type Data<T extends Name> = ReturnType<(typeof sections)[T]>
  export type Parser<T extends Name> = (reader: BinaryReader, world: WorldProperties) => Data<T>
}

export default sections as { [K in Section.Name]: Section.Parser<K> }
