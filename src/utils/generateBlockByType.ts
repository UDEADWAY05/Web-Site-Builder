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
        zIndex:1
      }
    case 'header':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:50},
        styles: defaultStyles,
        content: { text: 'new_header', level: 1 },
        zIndex:1
      }
    case 'image':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:100},
        styles: defaultStyles,
        content: { url: `${musical}`, alt: 'image' },
        zIndex:1
      }
    case 'button':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:120, height:40},
        styles: {...defaultStyles,fontSize:16, color:'#000000'},
        content: 'Button',
        zIndex:1
      }
    case 'ul':
    case 'ol':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:300, height:200},
        styles: defaultStyles,
        content: ['item1', 'item2'],
        zIndex:1
      }

    case 'divider':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:500, height:10},
        styles: {...defaultStyles,color:'red'},
        content: 'divider',
        zIndex:1
      }

    case 'quote':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:90},
        styles: {...defaultStyles,fontWeight:'bold', color:'#000000',fontSize:18},
        content: 'Lorem ipsum dolor sir amet',
        zIndex:1
      }
    case 'input':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:150, height:100},
        styles: defaultStyles,
        content: 'Inter your label',
        zIndex:1
      }

    case 'textarea':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:100},
        styles: defaultStyles,
        content: 'Type your message here',
        zIndex:1
      }

    case 'select':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:100},
        styles: defaultStyles,
        content: ['select 1', 'select2'],
        zIndex:1
      }

    case 'checkbox':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:100},
        styles: defaultStyles,
        content: 'Accept terms and conditions',
        zIndex:1
      }

    case 'radiobox':
      return {
        id,
        type,
        position: { x,y },
        dimentions: { width:200, height:90},
        styles: defaultStyles,
        content: ['yes', 'no'],
        zIndex:1
      }
    case 'divider':
      return {
        id,
        type,
        position: { x: 0, y },
        dimentions: {width: 1,height: 0 },
        styles: defaultStyles,
        zIndex: 1,
        content:''
    }

    default:
      throw new Error(`Unknown block type: ${type}`)
  }
}
