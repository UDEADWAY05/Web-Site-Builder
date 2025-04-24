import { Block } from 'src/store/slices/siteSlice'
import { transformHeight } from './transformHeight'
import { transformWidth } from './transformWidth'

export const generateCSSCode = (block: Block) => {
  return `
  .${block.type}-${block.id} {
      position:absolute;
      left: ${block.styles?.left || 0}px; 
      top: ${block.styles?.top || 0}px; 
      height: ${transformHeight(block)}; 
      width: ${transformWidth(block)};
      background-color: ${block.styles?.backgroundColor || '#fafafa'};
      font-size: ${block.styles?.fontSize || '14px'};
      font-style: ${block.styles?.fontStyle || ''};
      font-weight: ${block.styles?.fontWeight || ''};
      text-decoration: ${block.styles?.textDecoration || ''};
      color:${block.styles?.color || '#000'};`
}
