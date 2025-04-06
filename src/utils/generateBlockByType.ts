import { Block } from "src/store/slices/layoutSite"
// type BlockFactory = {
//     [K in Block['type']]: (left: number, top: number) => Extract<Block, { type: K }>
//   }

// const blockContentMap = new Map<Block['type'],Block['content']>([
//   ['text','New text'],
//   ['paragraph','New_text'],
//   ['image',{src:'new_src'}],
//   ['button',{text:'New_button'}],
//   ['ul',{ items:['line1','line2'] }],
//   ['ol',{ items:['line1','line2'] }],
// ])  

export function generateBlockByType(type: Block['type'], left: number, top: number): Block {
  const styles = {
    left: `${left}px`,
    top: `${top}px`,
    width: 'auto',
    height: 'auto',
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

  // const createBlock: BlockFactory = {
  //   text: (left, top) => ({
  //     id: Date.now().toString(),
  //     type: 'text',
  //     styles: { left, top, width: 'auto', height: 'auto' },
  //     content: 'New text',
  //   }),
  //   paragraph: (left, top) => ({
  //     id: Date.now().toString(),
  //     type: 'paragraph',
  //     styles: { left, top, width: 'auto', height: 'auto' },
  //     content: 'New paragraph',
  //   }),
  //   image: (left, top) => ({
  //     id: Date.now().toString(),
  //     type: 'image',
  //     styles: { left, top, width: 'auto', height: 'auto' },
  //     content: { src: '', alt: '' },
  //   }),
  //   button: (left, top) => ({
  //     id: Date.now().toString(),
  //     type: 'button',
  //     styles: { left, top, width: 'auto', height: 'auto' },
  //     content: { label: 'Click me', onClick: '' },
  //   }),
  //   ul: (left, top) => ({
  //     id: Date.now().toString(),
  //     type: 'ul',
  //     styles: { left, top, width: 'auto', height: 'auto' },
  //     content: { items: ['Item 1', 'Item 2'] },
  //   }),
  //   ol: (left, top) => ({
  //     id: Date.now().toString(),
  //     type: 'ol',
  //     styles: { left, top, width: 'auto', height: 'auto' },
  //     content: { items: ['Item 1', 'Item 2'] },
  //   }),
  // }