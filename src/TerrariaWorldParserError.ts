export default class TerrariaWorldParserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TerrariaWorldParserError';
  }
}
