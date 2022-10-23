import { readFile } from "node:fs/promises"
import { off } from "node:process"

interface fileReaderOptions {
    ignoreBounds?: boolean
    progressCallback?: (percent: number) => void
}

const defaultFileReaderOptions: fileReaderOptions = {
    ignoreBounds: false
}

interface fileReader {
    options: fileReaderOptions
    fileByteLength: number
    offset: number

    loadFile(file: File | Blob | string): Promise<this>
    loadBuffer(buffer: ArrayBuffer | Buffer): this

    readInt8(): number
    readUInt8(): number
    readInt16(): number
    readUInt16(): number
    readInt32(): number
    readUInt32(): number
    readInt64(): bigint
    readUInt64(): bigint
    readFloat32(): number
    readFloat64(): number
    readBoolean(): boolean
    readBytes(count: number): Uint8Array | Buffer
    readString(length?: number): string
    readBits(length: number): boolean[]
    readGuid(): string

    skipBytes(count: number): void
    jumpTo(offset: number): void
}

export {
    fileReaderOptions,
    fileReader,
    fileReaderBrowser,
    fileReaderNative
}

class fileReaderBrowser implements fileReader {
    options: fileReaderOptions
    fileByteLength: number
    private buffer: DataView
    private _offset: number
    private progress: number

    get offset() {
        return this._offset;
    }

    set offset(offset: number) {
        if (this.options.ignoreBounds && offset > this.buffer.byteLength) {
            this.buffer = new DataView(this.buffer.buffer, 0, this.buffer.byteLength + 10 * 1024 * 1024)
        }

        if (this.options.progressCallback && offset / this.fileByteLength * 100 > this.progress + 1 && this.progress != 100) {
            this.options.progressCallback(++this.progress)
        }

        this._offset = offset
    }

    constructor(options?: fileReaderOptions) {
        this.options = {
            ...defaultFileReaderOptions,
            ...options
        }
    }

    loadBuffer(buffer: ArrayBuffer): this {
        this.buffer = new DataView(buffer)
        this.fileByteLength = buffer.byteLength
        this.offset = this.progress = 0
        return this
    }

    loadFile(file: File | Blob): Promise<this> {
        return new Promise<this>((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
                resolve(this.loadBuffer(reader.result as ArrayBuffer))
            }

            reader.onerror = () => {
                reader.abort()
                reject(reader.error)
            }

            reader.readAsArrayBuffer(file)
        })
    }

    readInt8(): number {
        this.offset += 1
        return this.buffer.getInt8(this.offset - 1)
    }

    readUInt8(): number {
        this.offset += 1
        return this.buffer.getUint8(this.offset - 1)
    }

    readInt16(): number {
        this.offset += 2
        return this.buffer.getInt16(this.offset - 2, true)
    }

    readUInt16(): number {
        this.offset += 2
        return this.buffer.getUint16(this.offset - 2, true)
    }

    readInt32(): number {
        this.offset += 4
        return this.buffer.getInt32(this.offset - 4, true)
    }

    readUInt32(): number {
        this.offset += 4
        return this.buffer.getUint32(this.offset - 4, true)
    }

    readInt64(): bigint {
        this.offset += 8
        return this.buffer.getBigInt64(this.offset - 8, true)
    }

    readUInt64(): bigint {
        this.offset += 8
        return this.buffer.getBigUint64(this.offset - 8, true)
    }

    readFloat32(): number {
        this.offset += 4
        return this.buffer.getFloat32(this.offset - 4, true)
    }

    readFloat64(): number {
        this.offset += 8
        return this.buffer.getFloat64(this.offset - 8, true)
    }

    readBoolean(): boolean {
        return Boolean(this.readUInt8())
    }

    readBytes(count: number): Uint8Array {
        let data: number[] = []
        for (let i = 0; i < count; i++)
            data[i] = this.readUInt8()

        return new Uint8Array(data)
    }

    readString(length?: number): string {
        if (!length) { //7 bit encoded int32
            length = 0
            let shift = 0, byte
            do {
                byte = this.readUInt8()
                length |= (byte & 127) << shift
                shift += 7
            } while (byte & 128)
        }

        return new TextDecoder().decode(this.readBytes(length))
    }

    readBits(length: number): boolean[] {
        let bytes: number[] = []
        for (let i = length; i > 0; i = i - 8)
            bytes.push(this.readUInt8())

        let bitValues: boolean[] = []
        for (let i = 0, j = 0; i < length; i++, j++) {
            if (j == 8) {
                j = 0
            }

            bitValues[i] = Boolean(bytes[~~(i / 8)] & (1 << j))
        }

        return bitValues
    }

    readGuid(): string {
        const bytes: number[] = Array.from(this.readBytes(16))
        return bytes
            .slice(0, 4).reverse()
            .concat(bytes.slice(4, 6).reverse())
            .concat(bytes.slice(6, 8).reverse())
            .concat(bytes.slice(8))
            .map((byte, i) => ("00" + byte.toString(16)).substr(-2, 2) + ([4, 6, 8, 10].includes(i) ? "-" : ""))
            .join("")
    }

    skipBytes(count: number): void {
        this.offset += count
    }

    jumpTo(offset: number): void {
        this.offset = offset
    }
}

class fileReaderNative implements fileReader {
    options: fileReaderOptions
    fileByteLength: number
    private buffer: Buffer
    private _offset: number
    private progress: number

    get offset() {
        return this._offset;
    }

    set offset(offset: number) {
        if (this.options.ignoreBounds && offset > this.buffer.byteLength) {
            this.buffer = Buffer.concat([this.buffer, Buffer.alloc(10 * 1024 * 1024)])
        }

        if (this.options.progressCallback && offset / this.fileByteLength * 100 > this.progress + 1 && this.progress != 100) {
            this.options.progressCallback(++this.progress)
        }

        this._offset = offset
    }

    constructor(options?: fileReaderOptions) {
        this.options = {
            ...defaultFileReaderOptions,
            ...options
        }
    }
    
    loadBuffer(buffer: Buffer): this {
        this.buffer = buffer
        this.fileByteLength = buffer.byteLength
        this.offset = this.progress = 0
        return this
    }

    loadFile(file: string): Promise<this> {
        return new Promise<this>(async resolve => {
            resolve(this.loadBuffer(await readFile(file)))
        })
    }

    readInt8(): number {
        this.offset += 1
        return this.buffer.readInt8(this.offset - 1)
    }

    readUInt8(): number {
        this.offset += 1
        return this.buffer.readUInt8(this.offset - 1)
    }

    readInt16(): number {
        this.offset += 2
        return this.buffer.readInt16LE(this.offset - 2)
    }

    readUInt16(): number {
        this.offset += 2
        return this.buffer.readUInt16LE(this.offset - 2)
    }

    readInt32(): number {
        this.offset += 4
        return this.buffer.readInt32LE(this.offset - 4)
    }

    readUInt32(): number {
        this.offset += 4
        return this.buffer.readUInt32LE(this.offset - 4)
    }

    readInt64(): bigint {
        this.offset += 8
        return this.buffer.readBigInt64LE(this.offset - 8)
    }

    readUInt64(): bigint {
        this.offset += 8
        return this.buffer.readBigUInt64LE(this.offset - 8)
    }

    readFloat32(): number {
        this.offset += 4
        return this.buffer.readFloatLE(this.offset - 4)
    }

    readFloat64(): number {
        this.offset += 8
        return this.buffer.readDoubleLE(this.offset - 8)
    }

    readBoolean(): boolean {
        return Boolean(this.readUInt8())
    }

    readBytes(count: number): Buffer {
        let data: number[] = []
        for (let i = 0; i < count; i++)
            data[i] = this.readUInt8()

        return Buffer.from(data)
    }

    readString(length?: number): string {
        if (!length) { //7 bit encoded int32
            length = 0
            let shift = 0, byte
            do {
                byte = this.readUInt8()
                length |= (byte & 127) << shift
                shift += 7
            } while (byte & 128)
        }

        return this.readBytes(length).toString("utf8")
    }

    readBits(length: number): boolean[] {
        let bytes: number[] = []
        for (let i = length; i > 0; i = i - 8)
            bytes.push(this.readUInt8())

        let bitValues: boolean[] = []
        for (let i = 0, j = 0; i < length; i++, j++) {
            if (j == 8) {
                j = 0
            }

            bitValues[i] = Boolean(bytes[~~(i / 8)] & (1 << j))
        }

        return bitValues
    }

    readGuid(): string {
        const bytes: number[] = Array.from(this.readBytes(16))
        return bytes
            .slice(0, 4).reverse()
            .concat(bytes.slice(4, 6).reverse())
            .concat(bytes.slice(6, 8).reverse())
            .concat(bytes.slice(8))
            .map((byte, i) => ("00" + byte.toString(16)).substr(-2, 2) + ([4, 6, 8, 10].includes(i) ? "-" : ""))
            .join("")
    }

    skipBytes(count: number): void {
        this.offset += count
    }

    jumpTo(offset: number): void {
        this.offset = offset
    }
}