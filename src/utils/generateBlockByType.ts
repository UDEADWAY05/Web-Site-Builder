import { Block } from 'src/store/slices/siteSlice'
import { generateId } from './generateId'
import musical from '../assets/musical.png'

export function generateBlockByType(type: Block['type'], x: number, y: number): Block {
  const id = generateId()

  const defaultStyles: Block['styles'] = {
    backgroundColor: '#fafafa',
  }

  switch (type) {
    case 'paragraph':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:50},
        styles: {...defaultStyles, fontSize:16, color:'#000000'},
        content: 'new_paragraph',
      }
    case 'header':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:50},
        styles: defaultStyles,
        content: { text: 'new_header', level: 1 },
      }
    case 'image':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:100},
        styles: defaultStyles,
        content: { url: `${musical}`, alt: 'image' },
      }
    case 'button':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:50, height:30},
        styles: {...defaultStyles,fontSize:16, color:'#000000'},
        content: 'Button',
      }
    case 'ul':
    case 'ol':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:50},
        styles: defaultStyles,
        content: ['item1', 'item2'],
      }

    case 'divider':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:500, height:1},
        styles: defaultStyles,
        content: 'divider',
      }

    case 'quote':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:100, height:50},
        styles: {...defaultStyles,fontWeight:'bold', color:'#000000',fontSize:18},
        content: 'Lorem ipsum dolor sir amet',
      }
    case 'input':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:80, height:20},
        styles: defaultStyles,
        content: 'Inter your label',
      }

    case 'textarea':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:100},
        styles: defaultStyles,
        content: 'Type your message here',
      }

    case 'select':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:50},
        styles: defaultStyles,
        content: ['select 1', 'select2'],
      }

    case 'checkbox':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:50},
        styles: defaultStyles,
        content: 'Accept terms and conditions',
      }

    case 'radiobox':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:50},
        styles: defaultStyles,
        content: ['yes', 'no'],
      }

    default:
      throw new Error(`Unknown block type: ${type}`)
  }
}
