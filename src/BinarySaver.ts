export default class BinarySaver {
  private view = new DataView(new ArrayBuffer(4 * 1024 * 1024))
  private _offset = 0

  public progress = 0
  public progressCallback?: (percent: number) => void

  private get offset() {
    return this._offset
  }

  private set offset(offset: number) {
    if (this.offset + 10 > this.view.byteLength) {
      this.view = new DataView(this.view.buffer.transfer(this.view.byteLength + 4 * 1024 * 1024))
    }

    this._offset = offset
  }

  public getBuffer(): ArrayBuffer {
    return this.view.buffer
  }

  public saveInt8(value: number): void {
    this.view.setInt8(this.offset, value)
    this.offset += 1
  }

  public saveUInt8(value: number): void {
    this.view.setUint8(this.offset, value)
    this.offset += 1
  }

  public saveInt16(value: number): void {
    this.view.setInt16(this.offset, value, true)
    this.offset += 2
  }

  public saveUInt16(value: number): void {
    this.view.setUint16(this.offset, value, true)
    this.offset += 2
  }

  public saveInt32(value: number): void {
    this.view.setInt32(this.offset, value, true)
    this.offset += 4
  }

  public saveUInt32(value: number): void {
    this.view.setUint32(this.offset, value, true)
    this.offset += 4
  }

  public saveInt64(value: bigint): void {
    this.view.setBigInt64(this.offset, value, true)
    this.offset += 8
  }

  public saveUInt64(value: bigint): void {
    this.view.setBigUint64(this.offset, value, true)
    this.offset += 8
  }

  public saveFloat32(value: number): void {
    this.view.setFloat32(this.offset, value, true)
    this.offset += 4
  }

  public saveFloat64(value: number): void {
    this.view.setFloat64(this.offset, value, true)
    this.offset += 8
  }

  public saveBoolean(value: boolean): void {
    this.saveUInt8(Number(value))
  }

  public saveBytes(bytes: Uint8Array | number[]): void {
    bytes.forEach((byte) => this.saveUInt8(byte))
  }

  public saveString(text: string, saveLength = true) {
    const stringBytes = new TextEncoder().encode(text)

    if (saveLength) {
      let length = stringBytes.length,
        length7BitBytes = [],
        byte

      do {
        byte = length & 127
        length >>= 7
        if (length) {
          byte |= 128
        }
        length7BitBytes.push(byte)
      } while (length)

      this.saveBytes(length7BitBytes)
    }

    this.saveBytes(stringBytes)
  }

  public saveBits(bitValues: (number | boolean)[]): void {
    this.saveBytes(
      Array.from({ length: Math.ceil(bitValues.length / 8) }, (_, i) =>
        bitValues.slice(i * 8, ++i * 8).reduce((byte: number, bit, index) => byte | (Number(bit) << index), 0),
      ),
    )
  }

  public getPosition(): number {
    return this.offset
  }

  public skipBytes(count: number): void {
    this.offset += count
  }

  public jumpTo(offset: number): void {
    this.offset = offset
  }

  public trimEnd(): void {
    this.view = new DataView(this.view.buffer, 0, this.offset)
  }
}
