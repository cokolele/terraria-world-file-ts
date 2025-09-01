import BinaryReader, { BinaryReaderOptions } from "./BinaryReader";

type Section =
  | "fileFormatHeader"
  | "header"
  | "tiles"
  | "chests"
  | "signs"
  | "NPCs"
  | "tileEntities"
  | "weightedPressurePlates"
  | "rooms"
  | "bestiary"
  | "creativePowers"
  | "footer";

interface FileReaderOptions extends BinaryReaderOptions {
  ignorePointers?: boolean;
  dataRecovery?: boolean;
  sections?: Section[];
}

const defaultOptions: FileReaderOptions = {
  ignorePointers: false,
  dataRecovery: false,
};

export default class FileReader extends BinaryReader {
  constructor(options?: FileReaderOptions) {
    super({
      ...defaultOptions,
      ...options,
    });
  }

  parseNecessaryData(): { [key: string]: any } {
    let version: number,
      magicNumber: string,
      fileType: number,
      pointers: number[],
      importants: boolean[],
      height: number,
      width: number;

    this.jumpTo(0);

    try {
      version = this.readInt32();
      magicNumber = this.readString(7);
      fileType = this.readUInt8();
      this.skipBytes(12);
      pointers = [0];

      for (let i = this.readInt16(); i > 0; i--) {
        pointers.push(this.readInt32());
      }

      importants = this.readBits(this.readInt16());
      this.readString();
      this.readString();
      this.skipBytes(44);
      height = this.readInt32();
      width = this.readInt32();
    } catch (e) {
      throw new Error("Invalid file");
    }

    this.jumpTo(0);

    if (magicNumber != "relogic" || fileType != 2)
      throw new Error("Invalid file type");

    if (version < 194)
      throw new Error("Maps older than version 1.3.5.3 are not supported");

    return {
      version,
      pointers,
      importants,
      width,
      height,
    };
  }
}
