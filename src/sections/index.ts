import parseFileFormatHeader from './fileFormatHeader'
import parseHeader from './header'
import parseWorldTiles from './worldTiles'
import parseChests from './chests'
import parseSigns from './signs'
import parseNPCs from './NPCs'
import parseTileEntities from './tileEntities'
import parseWeightedPressurePlates from './weightedPressurePlates'
import parseTownManager from './townManager'
import parseBestiary from './bestiary'
import parseCreativePowers from './creativePowers'
import parseFooter from './footer'

export const sections = {
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

export default sections
