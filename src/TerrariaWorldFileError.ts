export default class TerrariaWorldFileError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'TerrariaWorldParserError'
  }
}
