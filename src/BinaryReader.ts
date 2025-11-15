export default class BinaryReader {
  private view!: DataView<ArrayBuffer>
  private _offset!: number
  private progress!: number

  public ignoreBounds = false
  public progressCallback?: (percent: number) => void

  private get offset() {
    return this._offset
  }

  private set offset(offset: number) {
    if (this.ignoreBounds && offset > this.view.byteLength) {
      this.view = new DataView(this.view.buffer.transfer(this.view.byteLength + 4 * 1024 * 1024))
    }

    if (this.progressCallback && (offset / this.view.byteLength) * 100 > this.progress + 1 && this.progress != 100) {
      this.progressCallback(++this.progress)
    }

    this._offset = offset
  }

  public loadBuffer(buffer: ArrayBuffer): this {
    this.view = new DataView(buffer)
    this._offset = this.progress = 0
    return this
  }

  public readInt8(): number {
    this.offset += 1
    return this.view.getInt8(this.offset - 1)
  }

  public readUInt8(): number {
    this.offset += 1
    return this.view.getUint8(this.offset - 1)
  }

  public readInt16(): number {
    this.offset += 2
    return this.view.getInt16(this.offset - 2, true)
  }

  public readUInt16(): number {
    this.offset += 2
    return this.view.getUint16(this.offset - 2, true)
  }

  public readInt32(): number {
    this.offset += 4
    return this.view.getInt32(this.offset - 4, true)
  }

  public readUInt32(): number {
    this.offset += 4
    return this.view.getUint32(this.offset - 4, true)
  }

  public readInt64(): bigint {
    this.offset += 8
    return this.view.getBigInt64(this.offset - 8, true)
  }

  public readUInt64(): bigint {
    this.offset += 8
    return this.view.getBigUint64(this.offset - 8, true)
  }

  public readFloat32(): number {
    this.offset += 4
    return this.view.getFloat32(this.offset - 4, true)
  }

  public readFloat64(): number {
    this.offset += 8
    return this.view.getFloat64(this.offset - 8, true)
  }

  public readBoolean(): boolean {
    return Boolean(this.readUInt8())
  }

  public readBytes(length: number): Uint8Array<ArrayBuffer> {
    return new Uint8Array(Array.from({ length }, () => this.readUInt8()))
  }

  public readString(length?: number): string {
    if (!length) {
      //7 bit encoded int32
      length = 0
      let shift = 0,
        byte: number
      do {
        byte = this.readUInt8()
        length |= (byte & 127) << shift
        shift += 7
      } while (byte & 128)
    }

    return new TextDecoder().decode(this.readBytes(length))
  }

  public readArray<T>(length: number, valueReader: () => T): T[] {
    return Array.from({ length }, () => valueReader())
  }

  public readArrayUntil<T>(predicate: () => boolean, valueReader: () => T): T[] {
    return Array.from(
      (function* () {
        while (predicate()) {
          yield valueReader()
        }
      })(),
    )
  }

  public readBits(length: number): boolean[] {
    let bytes = []
    for (let i = length; i > 0; i = i - 8) {
      bytes.push(this.readUInt8())
    }

    let bitValues = []
    for (let i = 0, j = 0; i < length; i++, j++) {
      if (j == 8) {
        j = 0
      }

      bitValues[i] = Boolean(bytes[~~(i / 8)] & (1 << j))
    }

    return bitValues
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

  public isFinished(): boolean {
    return this.offset >= this.view.byteLength
  }
}
