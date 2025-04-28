import { Block } from 'src/store/slices/siteSlice'
import musical from '../assets/musical.png'

export function generateBlockByType(
  type: Block['type'],
  left: number,
  top: number
): Block {
  const styles: Block['styles'] = {
    left,
    top,
    backgroundColor: '#fafafa',
  }

  switch (type) {
    case 'paragraph':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'new_paragraph',
      }
    case 'header':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: { text: 'new_header', level: 1 },
      }
    case 'image':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: { url: `${musical}`, alt: 'image' },
      }
    case 'button':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'Button',
      }
    case 'ul':
    case 'ol':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: ['item1', 'item2'],
      }

    case 'divider':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'divider',
      }

    case 'quote':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'Lorem ipsum dolor sir amet',
      }
    ///// form////
    case 'input':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'Inter your label',
      }

    case 'textarea':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'Type your message here',
      }

    case 'select':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: ['select 1', 'select2'],
      }

    case 'checkbox':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'Accept terms and conditions',
      }

    case 'radiobox':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: ['yes', 'no'],
      }

    default:
      throw new Error(`Unknown block type: ${type}`)
  }
}
