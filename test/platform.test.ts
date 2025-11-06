import { describe, expect, test } from 'vitest'
import { fileLoader } from '../src/platform/node'

const testFilePath = import.meta.dirname + '/test.wld'

describe.concurrent('Terraria World File platform specific functions', () => {
  test('Node file loader', () => {
    expect(fileLoader(testFilePath)).toBeInstanceOf(Promise)
  })

  test('Node file loader revolves', async () => {
    await expect(fileLoader(testFilePath)).resolves.toBeInstanceOf(ArrayBuffer)
  })

  test('Node file loader fails', async () => {
    await expect(fileLoader('./non/existent.wld')).rejects.toThrow()
  })
})
