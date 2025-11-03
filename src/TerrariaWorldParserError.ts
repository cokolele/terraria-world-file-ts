export default class TerrariaWorldParserError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'TerrariaWorldParserError'
  }
}
