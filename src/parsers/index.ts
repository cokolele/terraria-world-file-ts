import parseFileFormatHeader from './fileFormatHeader'
import parseHeader from './header'
import parseWorldTiles from './worldTiles'
// import chests from './worldTiles'
// import signs from './worldTiles'
// import NPCs from './worldTiles'
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
} as const

export default sections
