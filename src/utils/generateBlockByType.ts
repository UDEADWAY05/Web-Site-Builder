import { Block } from 'src/store/slices/siteSlice'
import { generateId } from './generateId'
import musical from '../assets/musical.png'

export function generateBlockByType(type: Block['type'], left: number, top: number): Block {
  const id = generateId()

  const defaultStyles: Block['styles'] = {
    left,
    top,
    backgroundColor: '#fafafa',
  }

  switch (type) {
    case 'paragraph':
      return {
        id,
        type,
        styles: {...defaultStyles, fontSize:16, color:'#000000'},
        content: 'new_paragraph',
      }
    case 'header':
      return {
        id,
        type,
        styles: defaultStyles,
        content: { text: 'new_header', level: 1 },
      }
    case 'image':
      return {
        id,
        type,
        styles: defaultStyles,
        content: { url: `${musical}`, alt: 'image' },
      }
    case 'button':
      return {
        id,
        type,
        styles: {...defaultStyles,fontSize:16, color:'#000000'},
        content: 'Button',
      }
    case 'ul':
    case 'ol':
      return {
        id,
        type,
        styles: defaultStyles,
        content: ['item1', 'item2'],
      }

    case 'divider':
      return {
        id,
        type,
        styles: defaultStyles,
        content: 'divider',
      }

    case 'quote':
      return {
        id,
        type,
        styles: {...defaultStyles,fontWeight:'bold', color:'#000000',fontSize:18},
        content: 'Lorem ipsum dolor sir amet',
      }
    case 'input':
      return {
        id,
        type,
        styles: defaultStyles,
        content: 'Inter your label',
      }

    case 'textarea':
      return {
        id,
        type,
        styles: defaultStyles,
        content: 'Type your message here',
      }

    case 'select':
      return {
        id,
        type,
        styles: defaultStyles,
        content: ['select 1', 'select2'],
      }

    case 'checkbox':
      return {
        id,
        type,
        styles: defaultStyles,
        content: 'Accept terms and conditions',
      }

    case 'radiobox':
      return {
        id,
        type,
        styles: defaultStyles,
        content: ['yes', 'no'],
      }

    default:
      throw new Error(`Unknown block type: ${type}`)
  }
}
