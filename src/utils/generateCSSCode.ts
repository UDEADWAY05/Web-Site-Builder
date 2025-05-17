import { Block } from 'src/store/slices/siteSlice'
import { transformHeight } from './transformHeight'
import { transformWidth } from './transformWidth'

export const generateCSSCode = (block: Block) => {
  return `
  .${block.type}-${block.id} {
      position:absolute;
      left: ${block.position.x || 0}px; 
      top: ${block.position.y || 0}px; 
      height: ${transformHeight(block)}; 
      width: ${transformWidth(block)};
      background-color: ${block.styles?.backgroundColor || '#fafafa'};
      font-size: ${
        block.type === 'header' ? '' : block.styles?.fontSize || '14px'
      };
      font-style: ${block.styles?.fontStyle || 'normal'};
      font-weight: ${block.styles?.fontWeight || 'normal'};
      text-decoration: ${block.styles?.textDecoration || 'none'};
      color:${block.styles?.color || '#000000'};}`
}
