[**terraria-world-file**](../README.md)

***

[terraria-world-file](../globals.md) / default

# Class: default

Defined in: [src/FileReader.ts:7](https://github.com/cokolele/terraria-world-file-ts/blob/bee6fd53e3343381d8039b4efe8c5d24aba5cd2b/src/FileReader.ts#L7)

## Constructors

### Constructor

> **new default**(): `FileReader`

#### Returns

`FileReader`

## Methods

### loadFile()

> **loadFile**(`loader`, `path`): `Promise`\<`FileReader`\>

Defined in: [src/FileReader.ts:22](https://github.com/cokolele/terraria-world-file-ts/blob/bee6fd53e3343381d8039b4efe8c5d24aba5cd2b/src/FileReader.ts#L22)

#### Parameters

##### loader

(`path`) => `Promise`\<[`ArrayBufferLike`](../-internal-/type-aliases/ArrayBufferLike.md)\>

##### path

`string`

#### Returns

`Promise`\<`FileReader`\>

***

### parse()

> **parse**(`options?`): [`Partial`](../-internal-/type-aliases/Partial.md)\<[`Map`](../terraria-world-file/namespaces/Section/type-aliases/Map.md)\>

Defined in: [src/FileReader.ts:28](https://github.com/cokolele/terraria-world-file-ts/blob/bee6fd53e3343381d8039b4efe8c5d24aba5cd2b/src/FileReader.ts#L28)

#### Parameters

##### options?

[`Partial`](../-internal-/type-aliases/Partial.md)\<[`Options`](../type-aliases/Options.md)\>

#### Returns

[`Partial`](../-internal-/type-aliases/Partial.md)\<[`Map`](../terraria-world-file/namespaces/Section/type-aliases/Map.md)\>
