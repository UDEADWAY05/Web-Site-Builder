import { describe, it, expect } from 'vitest'
import { generateCSS } from '../generateCSS'
import type { Block } from 'src/store/slices/siteSlice'

describe('generateCSS', () => {
  it('should return empty string for undefined blocks', () => {
    const result = generateCSS(undefined)
    expect(result).toBe('')
  })

  it('should return empty string for null blocks', () => {
    const result = generateCSS(null as unknown as Block[])
    expect(result).toBe('')
  })

  it('should return empty string for empty blocks array', () => {
    const result = generateCSS([])
    expect(result).toBe('')
  })

  it('should generate CSS for paragraph block', () => {
    const blocks: Block[] = [
      {
        id: 'para1',
        position: { x: 0, y: 0 },
        dimensions: { width: 100, height: 50 },
        type: 'paragraph',
        content: 'Sample text',
        styles: {
          color: '#333333',
          fontSize: 16,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
        },
        zIndex: 1,
      },
    ]

    const result = generateCSS(blocks)
    expect(result).toMatchInlineSnapshot(`
      "
        .paragraph-para1 {
            position:absolute;
            left: 0px; 
            top: 0px; 
            height: 50px; 
            width: 100px;
            background-color: #fafafa;
            font-size: 16;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            color:#333333;}"
    `)
  })

  it('should generate CSS for header block', () => {
    const blocks: Block[] = [
      {
        id: 'header1',
        position: { x: 10, y: 20 },
        dimensions: { width: 200, height: 80 },
        type: 'header',
        content: { text: 'Header text', level: 1 },
        styles: {
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
        },
        zIndex: 2,
      },
    ]

    const result = generateCSS(blocks)
    expect(result).toMatchInlineSnapshot(`
      "
        .header-header1 {
            position:absolute;
            left: 10px; 
            top: 20px; 
            height: 80px; 
            width: 200px;
            background-color: #fafafa;
            font-size: ;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            color:#000000;}"
    `)
  })

  it('should generate CSS for multiple blocks', () => {
    const blocks: Block[] = [
      {
        id: 'block1',
        position: { x: 0, y: 0 },
        dimensions: { width: 100, height: 50 },
        type: 'paragraph',
        content: 'First block',
        styles: {
          color: 'red',
          fontSize: 14,
        },
        zIndex: 1,
      },
      {
        id: 'block2',
        position: { x: 100, y: 50 },
        dimensions: { width: 150, height: 75 },
        type: 'button',
        content: { text: 'Click me', type: 'button', script: 'script' },
        styles: {
          color: 'white',
          borderColor: 'darkblue',
        },
        zIndex: 2,
      },
    ]

    const result = generateCSS(blocks)
    expect(result).toMatchInlineSnapshot(`
      "
        .paragraph-block1 {
            position:absolute;
            left: 0px; 
            top: 0px; 
            height: 50px; 
            width: 100px;
            background-color: #fafafa;
            font-size: 14;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            color:red;}

        .button-block2 {
            position:absolute;
            left: 100px; 
            top: 50px; 
            height: 75px; 
            width: 150px;
            background-color: #fafafa;
            font-size: 14px;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            color:white;}"
    `)
  })

  it('should handle blocks with minimal styles', () => {
    const blocks: Block[] = [
      {
        id: 'minimal',
        position: { x: 0, y: 0 },
        dimensions: { width: 50, height: 50 },
        type: 'divider',
        styles: {},
        zIndex: 1,
        content: '',
      },
    ]

    const result = generateCSS(blocks)
    expect(result).toMatchInlineSnapshot(`
      "
        .divider-minimal {
            position:absolute;
            left: 0px; 
            top: 0px; 
            height: 50px; 
            width: 100%;
            background-color: #fafafa;
            font-size: 14px;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            color:#000000;}"
    `)
  })
})
