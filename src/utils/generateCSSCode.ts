import { Block } from 'src/store/slices/siteSlice'

export const generateCSSCode = (block: Block) => {
  return `
  .${block.type}-${block.id} {
      position:absolute;
      left: ${block.position.x || 0}px; 
      top: ${block.position.y || 0}px; 
      height: ${block.dimentions.height || 'auto'}; 
      width: ${
        block.type !== 'divider' ? `${block.dimentions.width || 'auto'}` : '100%'
      };
      background-color: ${block.styles?.backgroundColor || '#fafafa'};
      font-size: ${
        block.type === 'header' ? '' : block.styles?.fontSize || '14px'
      };
      font-style: ${block.styles?.fontStyle || ''};
      font-weight: ${block.styles?.fontWeight || ''};
      text-decoration: ${block.styles?.textDecoration || ''};
      color:${block.styles?.color || '#000000'};}`
}
