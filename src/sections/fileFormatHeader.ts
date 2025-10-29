import {Section, WorldProperties} from "../types";
import BinaryReader from "../BinaryReader";

export default function fileFormatHeader(reader: BinaryReader, world: WorldProperties): Section.FileFormatHeader {
  let data = {} as Section.FileFormatHeader;

  data.version = reader.readInt32();
  data.magicNumber = reader.readString(7);
  data.fileType = reader.readUInt8();
  data.revision = reader.readUInt32();
  data.favorite = reader.readBoolean();

  reader.skipBytes(7);
  data.pointers = [];
  for (let i = reader.readInt16(); i > 0; i--) {
    data.pointers.push(reader.readInt32());
  }

  data.importants = reader.readBits(reader.readUInt16());

  return data;
}
