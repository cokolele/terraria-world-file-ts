[**terraria-world-file**](../README.md)

***

[terraria-world-file](../globals.md) / default

# Class: default

Defined in: [src/FileReader.ts:25](https://github.com/cokolele/terraria-world-file-ts/blob/94cb2473bcb7c6d856cdf2ac88c73740ebe5499e/src/FileReader.ts#L25)

## Constructors

### Constructor

> **new default**(): `FileReader`

#### Returns

`FileReader`

## Methods

### loadBuffer()

> **loadBuffer**(`buffer`): `Promise`\<`FileReader`\>

Defined in: [src/FileReader.ts:54](https://github.com/cokolele/terraria-world-file-ts/blob/94cb2473bcb7c6d856cdf2ac88c73740ebe5499e/src/FileReader.ts#L54)

#### Parameters

##### buffer

[`ArrayBufferLike`](../-internal-/type-aliases/ArrayBufferLike.md)

#### Returns

`Promise`\<`FileReader`\>

***

### loadFile()

> **loadFile**(`loader`, `path`): `Promise`\<`FileReader`\>

Defined in: [src/FileReader.ts:48](https://github.com/cokolele/terraria-world-file-ts/blob/94cb2473bcb7c6d856cdf2ac88c73740ebe5499e/src/FileReader.ts#L48)

#### Parameters

##### loader

(`path`) => `Promise`\<[`ArrayBufferLike`](../-internal-/type-aliases/ArrayBufferLike.md)\>

##### path

`string`

#### Returns

`Promise`\<`FileReader`\>

***

### parse()

> **parse**\<`T`\>(`options?`): [`SelectedDataMap`](../-internal-/type-aliases/SelectedDataMap.md)\<`T`\>

Defined in: [src/FileReader.ts:60](https://github.com/cokolele/terraria-world-file-ts/blob/94cb2473bcb7c6d856cdf2ac88c73740ebe5499e/src/FileReader.ts#L60)

#### Type Parameters

##### T

`T` *extends* (`"fileFormatHeader"` \| `"header"` \| `"tiles"` \| `"chests"` \| `"signs"` \| `"NPCs"` \| `"tileEntities"` \| `"weightedPressurePlates"` \| `"townManager"` \| `"bestiary"` \| `"creativePowers"` \| `"footer"`)[]

#### Parameters

##### options?

[`Options`](../-internal-/type-aliases/Options.md)\<`T`\>

#### Returns

[`SelectedDataMap`](../-internal-/type-aliases/SelectedDataMap.md)\<`T`\>
