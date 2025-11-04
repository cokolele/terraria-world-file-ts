import parseFileFormatHeader from './fileFormatHeader'
import parseHeader from './header'
import parseWorldTiles from './worldTiles'
import parseChests from './chests'
import parseSigns from './signs'
import parseNPCs from './NPCs'
// import tileEntities from './worldTiles'
// import weightedPressurePlates from './worldTiles'
// import rooms from './worldTiles'
// import bestiary from './worldTiles'
// import creativePowers from './worldTiles'
// import footer from './worldTiles'

export const sections = {
  fileHeader: parseFileFormatHeader,
  header: parseHeader,
  tiles: parseWorldTiles,
  chests: parseChests,
  signs: parseSigns,
  NPCs: parseNPCs,
} as const

export default sections
