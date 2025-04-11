import { CSSProperties } from "react";
import { Block } from "src/store/slices/layoutSite"

export function generateBlockByType(type: Block['type'], left: number, top: number): Block {
  const styles:CSSProperties = {
    left: `${left}px`,
    top: `${top}px`,
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    minHeight: '40px',
    maxWidth:'100%',
    backgroundColor: '#fafafa',
    border: '1px',
    padding: '1.2rem 0.8rem',
    cursor: 'move',
    zIndex: 10,
  };

  switch (type) {
    case 'paragraph':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'new_paragraph',
      };
    case 'header':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'new_header', 
      }
    // case 'image':
    //   return {
    //     id: Date.now().toString(),
    //     type,
    //     styles,
    //     content: { src: '', alt: '' }, 
    //   }
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
        content: ['item1','item2']
      }

    // case 'divider':
    //   return {
    //     id: Date.now().toString(),
    //     type,
    //     styles,
    //     content:'divider'
    // }

    case 'quote':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content:'Lorem ipsum dolor sir amet'
    }
    default:
      throw new Error(`Unknown block type: ${type}`);
  }
}