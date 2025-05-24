import { describe, it, expect } from 'vitest'
import { useTransformData } from '../useTransformData'
import { Block } from 'src/store/slices/siteSlice/types'

describe('useTransformData', () => {
  it('shoult filter for base block', () => {
    const block: Block[] = [
      {
        id: 'paragraph1',
        type: 'paragraph',
        content: 'Some random text',
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
      {
        id: 'header',
        type: 'header',
        content: { text: 'some', level: 1 },
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
      {
        id: 'input1',
        type: 'input',
        content: 'Some',
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
      {
        id: 'button1',
        type: 'button',
        content: { text: 'some', type: 'submit', script: '' },
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
    ]
    const result = useTransformData(block)

    expect(result.blocksBase).toEqual([
      {
        id: 'paragraph1',
        type: 'paragraph',
        content: 'Some random text',
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
      {
        id: 'header',
        type: 'header',
        content: { text: 'some', level: 1 },
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
    ])
    expect(result.blocksForm).toEqual([
      {
        id: 'input1',
        type: 'input',
        content: 'Some',
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
      {
        id: 'button1',
        type: 'button',
        content: { text: 'some', type: 'submit', script: '' },
        position: { x: 1, y: 2 },
        dimensions: {
          width: 1,
          height: 2,
        },
        styles: {},
        zIndex: 1,
      },
    ])
  })
})
