import { CSSProperties } from "react";
import { Block } from "src/store/slices/layoutSite"
import { BlockStyles } from "src/store/slices/layoutSite/types";

// const blockContentMap = new Map<Block['type'],Block['content']>([
//   ['text','New text'],
//   ['paragraph','New_text'],
//   ['image',{src:'new_src'}],
//   ['button',{text:'New_button'}],
//   ['ul',{ items:['line1','line2'] }],
//   ['ol',{ items:['line1','line2'] }],
// ])  

export function generateBlockByType(type: Block['type'], left: number, top: number): Block {
  const styles:CSSProperties = {
    left: `${left}px`,
    top: `${top}px`,
    // width: `${block.styles?.width}px`,
    // height: `${block.styles?.height}px`,
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    minHeight: '30px',
    backgroundColor: '#bcbabd',
    border: '2px solid #ddd',
    padding: '10px',
    cursor: 'move',
    zIndex: 10,
  };

  switch (type) {
    case 'text':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'new_text', // matches TextBlock
      };
    case 'paragraph':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'new_paragraph', // matches ParagraphBlock
      };
    case 'header':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: 'new_header', 
      }
    case 'image':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: { src: '', alt: '' }, // matches ImageBlock
      }
    case 'button':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: { text: 'Click me' }, // matches ButtonBlock
      };
    case 'ul':
   
    case 'ol':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content: { items: ['item1','item2'] }, // matches both list types
      }

    case 'divider':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content:'divider'
    }

    case 'quote':
      return {
        id: Date.now().toString(),
        type,
        styles,
        content:'lorem ipsum dolor'
    }
    default:
      throw new Error(`Unknown block type: ${type}`);
  }
}