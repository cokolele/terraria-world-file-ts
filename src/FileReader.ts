import BinaryReader from './BinaryReader';
import sections from './sections';
import TerrariaWorldParserError from "./TerrariaWorldParserError";

import type {Options, Section, WorldProperties} from './types';

export default class FileReader {
  private world: WorldProperties;
  private reader: BinaryReader = new BinaryReader();

  public ignorePointers: boolean;
  public dataRecovery: boolean;
  public selectedSections: Section.Name[];

  public setOptions(options: Options): this {
    this.ignorePointers = options.ignorePointers || false;
    this.dataRecovery = options.dataRecovery || false;
    this.selectedSections = options.sections || (Object.keys(sections) as Section.Name[]);

    this.reader.ignoreBounds = options.ignoreBounds || false;
    this.reader.progressCallback = options.progressCallback || undefined;

    return this;
  }

  public async loadFile(loader: (path: string) => Promise<ArrayBufferLike>, path: string): Promise<this> {
    this.reader.loadBuffer(await loader(path));

    return this;
  }

  public parse(options: Options = {}): {[K in Section.Name]: {}} {
    this.setOptions(options);

    let data = {};

    this.world = this.parseWorldProperties();

    // if (this.world.version < 225) {
    //   delete sections.bestiary;
    //   delete sections.creativePowers;
    // }

    for (let [sectionName, parseFunction] of Object.entries(sections)) {
      if (!this.selectedSections.includes(sectionName as Section.Name)) {
        continue;
      }

      const sectionIndex = Object.keys(sections).indexOf(sectionName);

      this.reader.jumpTo(this.world.pointers[sectionIndex]);
      data[sectionName] = parseFunction(this.reader, this.world);

      if (
        !this.ignorePointers
        && this.reader.offset != this.world.pointers[sectionIndex + 1]
        // && this.reader.offset != this.reader.view.byteLength
      ) {
        throw new TerrariaWorldParserError(`Section ${sectionName} parsing ended at wrong point`);
      }
    }

    return data;
  }

  private parseWorldProperties(): WorldProperties {
    const data = {} as WorldProperties;
    let magicNumber, fileType;

    try {
      data.version = this.reader.readInt32();
      magicNumber = this.reader.readString(7);
      fileType = this.reader.readUInt8();
      this.reader.skipBytes(12);
      data.pointers = [0];

      for (let i = this.reader.readInt16(); i > 0; i--) {
        data.pointers.push(this.reader.readInt32());
      }

      data.importants = this.reader.readBits(this.reader.readInt16());
      this.reader.readString();
      this.reader.readString();
      this.reader.skipBytes(44);
      data.height = this.reader.readInt32();
      data.width = this.reader.readInt32();
    } catch (e) {
      throw new TerrariaWorldParserError('Invalid file');
    }

    this.reader.jumpTo(0);

    if (magicNumber != 'relogic' || fileType != 2) {
      throw new TerrariaWorldParserError('Wrong file type');
    }

    if (data.version < 194) {
      throw new TerrariaWorldParserError('Map file is too old');
    }

    return data;
  }
}
