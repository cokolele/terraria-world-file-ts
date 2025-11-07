[**terraria-world-file**](../../README.md)

***

[terraria-world-file](../../globals.md) / [\<internal\>](../README.md) / default

# Class: default

Defined in: [src/BinaryReader.ts:1](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L1)

## Constructors

### Constructor

> **new default**(): `BinaryReader`

#### Returns

`BinaryReader`

## Properties

### ignoreBounds

> **ignoreBounds**: `boolean` = `false`

Defined in: [src/BinaryReader.ts:6](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L6)

***

### progressCallback()?

> `optional` **progressCallback**: (`percent`) => `void`

Defined in: [src/BinaryReader.ts:7](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L7)

#### Parameters

##### percent

`number`

#### Returns

`void`

## Methods

### getPosition()

> **getPosition**(): `number`

Defined in: [src/BinaryReader.ts:142](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L142)

#### Returns

`number`

***

### isFinished()

> **isFinished**(): `boolean`

Defined in: [src/BinaryReader.ts:154](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L154)

#### Returns

`boolean`

***

### jumpTo()

> **jumpTo**(`offset`): `void`

Defined in: [src/BinaryReader.ts:150](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L150)

#### Parameters

##### offset

`number`

#### Returns

`void`

***

### loadBuffer()

> **loadBuffer**(`buffer`): `this`

Defined in: [src/BinaryReader.ts:25](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L25)

#### Parameters

##### buffer

[`ArrayBufferLike`](../type-aliases/ArrayBufferLike.md)

#### Returns

`this`

***

### readArray()

> **readArray**\<`T`\>(`length`, `valueReader`): `T`[]

Defined in: [src/BinaryReader.ts:110](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L110)

#### Type Parameters

##### T

`T`

#### Parameters

##### length

`number`

##### valueReader

() => `T`

#### Returns

`T`[]

***

### readArrayUntil()

> **readArrayUntil**\<`T`\>(`predicate`, `valueReader`): `T`[]

Defined in: [src/BinaryReader.ts:114](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L114)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

() => `boolean`

##### valueReader

() => `T`

#### Returns

`T`[]

***

### readBits()

> **readBits**(`length`): `boolean`[]

Defined in: [src/BinaryReader.ts:124](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L124)

#### Parameters

##### length

`number`

#### Returns

`boolean`[]

***

### readBoolean()

> **readBoolean**(): `boolean`

Defined in: [src/BinaryReader.ts:81](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L81)

#### Returns

`boolean`

***

### readBytes()

> **readBytes**(`count`): `Uint8Array`

Defined in: [src/BinaryReader.ts:85](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L85)

#### Parameters

##### count

`number`

#### Returns

`Uint8Array`

***

### readFloat32()

> **readFloat32**(): `number`

Defined in: [src/BinaryReader.ts:71](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L71)

#### Returns

`number`

***

### readFloat64()

> **readFloat64**(): `number`

Defined in: [src/BinaryReader.ts:76](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L76)

#### Returns

`number`

***

### readInt16()

> **readInt16**(): `number`

Defined in: [src/BinaryReader.ts:41](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L41)

#### Returns

`number`

***

### readInt32()

> **readInt32**(): `number`

Defined in: [src/BinaryReader.ts:51](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L51)

#### Returns

`number`

***

### readInt64()

> **readInt64**(): `bigint`

Defined in: [src/BinaryReader.ts:61](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L61)

#### Returns

`bigint`

***

### readInt8()

> **readInt8**(): `number`

Defined in: [src/BinaryReader.ts:31](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L31)

#### Returns

`number`

***

### readString()

> **readString**(`length?`): `string`

Defined in: [src/BinaryReader.ts:94](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L94)

#### Parameters

##### length?

`number`

#### Returns

`string`

***

### readUInt16()

> **readUInt16**(): `number`

Defined in: [src/BinaryReader.ts:46](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L46)

#### Returns

`number`

***

### readUInt32()

> **readUInt32**(): `number`

Defined in: [src/BinaryReader.ts:56](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L56)

#### Returns

`number`

***

### readUInt64()

> **readUInt64**(): `bigint`

Defined in: [src/BinaryReader.ts:66](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L66)

#### Returns

`bigint`

***

### readUInt8()

> **readUInt8**(): `number`

Defined in: [src/BinaryReader.ts:36](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L36)

#### Returns

`number`

***

### skipBytes()

> **skipBytes**(`count`): `void`

Defined in: [src/BinaryReader.ts:146](https://github.com/cokolele/terraria-world-file-ts/blob/11b1413aa63c3ac1ac46f70787c81e7f610a70b4/src/BinaryReader.ts#L146)

#### Parameters

##### count

`number`

#### Returns

`void`
