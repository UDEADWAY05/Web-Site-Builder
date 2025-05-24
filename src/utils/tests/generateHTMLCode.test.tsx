import { describe, it, expect } from 'vitest'
import { generateHTMLCode } from '../generateHTMLCode'
import { Block } from 'src/store/slices/siteSlice'

describe('generateHTMLCode', () => {
  it('should generate HTML for header block', () => {
    const block: Block = {
      id: 'header1',
      type: 'header',
      content: { text: 'Title', level: 2 },
      position: { x: 1, y: 2 },
      dimensions: {
        width: 1,
        height: 2,
      },
      styles: {},
      zIndex: 1,
    }

    const result = generateHTMLCode(block)
    expect(result).toBe('<h2 class="header-header1">Title</h2>')
  })

  it('should generate HTML for paragraph block', () => {
    const block: Block = {
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
    }
    const result = generateHTMLCode(block)
    expect(result).toBe('<p class="paragraph-paragraph1">Some random text</p>')
  })

  it('should generate HTML for ol block', () => {
    const block: Block = {
      id: 'ol1',
      type: 'ol',
      content: ['item1', 'item2'],
      position: { x: 1, y: 2 },
      dimensions: {
        width: 1,
        height: 2,
      },
      styles: {},
      zIndex: 1,
    }
    const result = generateHTMLCode(block)
    expect(result).toMatchSnapshot()
  })
  it('should generate HTML for empty ol block', () => {
    const block: Block = {
      id: 'ol1',
      type: 'ol',
      content: [],
      position: { x: 1, y: 2 },
      dimensions: {
        width: 1,
        height: 2,
      },
      styles: {},
      zIndex: 1,
    }
    // const expected = `<ol class="ol-ol1">
    //     </ol>`

    const result = generateHTMLCode(block)
    // expect(result).toBe(expected)
    expect(result).toMatchSnapshot()
  })
})
