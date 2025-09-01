interface BinaryReaderOptions {
  ignoreBounds?: boolean;
  progressCallback?: (percent: number) => void;
}

const defaultOptions: BinaryReaderOptions = {
  ignoreBounds: false,
};

export type { BinaryReaderOptions };

export default class BinaryReader {
  public options: BinaryReaderOptions;
  private view: DataView;
  private _offset: number;
  private progress: number;

  get offset() {
    return this._offset;
  }

  set offset(offset: number) {
    if (this.options.ignoreBounds && offset > this.view.byteLength) {
      this.view = new DataView(
        this.view.buffer,
        0,
        this.view.byteLength + 10 * 1024 * 1024
      );
    }

    if (
      this.options.progressCallback &&
      (offset / this.view.byteLength) * 100 > this.progress + 1 &&
      this.progress != 100
    ) {
      this.options.progressCallback(++this.progress);
    }

    this._offset = offset;
  }

  constructor(options?: BinaryReaderOptions) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  loadBuffer(buffer: ArrayBuffer): this {
    this.view = new DataView(buffer);
    this.offset = this.progress = 0;
    return this;
  }

  protected readInt8(): number {
    this.offset += 1;
    return this.view.getInt8(this.offset - 1);
  }

  protected readUInt8(): number {
    this.offset += 1;
    return this.view.getUint8(this.offset - 1);
  }

  protected readInt16(): number {
    this.offset += 2;
    return this.view.getInt16(this.offset - 2, true);
  }

  protected readUInt16(): number {
    this.offset += 2;
    return this.view.getUint16(this.offset - 2, true);
  }

  protected readInt32(): number {
    this.offset += 4;
    return this.view.getInt32(this.offset - 4, true);
  }

  protected readUInt32(): number {
    this.offset += 4;
    return this.view.getUint32(this.offset - 4, true);
  }

  protected readInt64(): bigint {
    this.offset += 8;
    return this.view.getBigInt64(this.offset - 8, true);
  }

  protected readUInt64(): bigint {
    this.offset += 8;
    return this.view.getBigUint64(this.offset - 8, true);
  }

  protected readFloat32(): number {
    this.offset += 4;
    return this.view.getFloat32(this.offset - 4, true);
  }

  protected readFloat64(): number {
    this.offset += 8;
    return this.view.getFloat64(this.offset - 8, true);
  }

  protected readBoolean(): boolean {
    return Boolean(this.readUInt8());
  }

  protected readBytes(count: number): Uint8Array {
    let data: number[] = [];
    for (let i = 0; i < count; i++) {
      data[i] = this.readUInt8();
    }

    return new Uint8Array(data);
  }

  protected readString(length?: number): string {
    if (!length) {
      //7 bit encoded int32
      length = 0;
      let shift = 0,
        byte: number;
      do {
        byte = this.readUInt8();
        length |= (byte & 127) << shift;
        shift += 7;
      } while (byte & 128);
    }

    return new TextDecoder().decode(this.readBytes(length));
  }

  protected readBits(length: number): boolean[] {
    let bytes: number[] = [];
    for (let i = length; i > 0; i = i - 8) bytes.push(this.readUInt8());

    let bitValues: boolean[] = [];
    for (let i = 0, j = 0; i < length; i++, j++) {
      if (j == 8) {
        j = 0;
      }

      bitValues[i] = Boolean(bytes[~~(i / 8)] & (1 << j));
    }

    return bitValues;
  }

  protected readGuid(): string {
    const bytes: number[] = Array.from(this.readBytes(16));
    return bytes
      .slice(0, 4)
      .reverse()
      .concat(bytes.slice(4, 6).reverse())
      .concat(bytes.slice(6, 8).reverse())
      .concat(bytes.slice(8))
      .map(
        (byte, i) =>
          ("00" + byte.toString(16)).substr(-2, 2) +
          ([4, 6, 8, 10].includes(i) ? "-" : "")
      )
      .join("");
  }

  protected skipBytes(count: number): void {
    this.offset += count;
  }

  protected jumpTo(offset: number): void {
    this.offset = offset;
  }
}
