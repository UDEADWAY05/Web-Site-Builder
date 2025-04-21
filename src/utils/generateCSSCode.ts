import { Block } from 'src/store/slices/siteSlice'

export const generateCSSCode = (block: Block) => {
  return `
  .${block.type}-${block.id} {
      position:absolute;
      left: ${block.styles?.left || 0}px; 
      top: ${block.styles?.top || 0}px; 
      height: ${block.styles?.height || 'auto'}; 
      width: ${
        block.type !== 'divider' ? `${block.styles?.width || 'auto'}` : '100%'
      };
      background-color: ${block.styles?.background || '#fafafa'};
      font-size: ${block.styles?.fontSize || '14px'};
      font-style: ${block.styles?.fontStyle || ''};
      font-weight: ${block.styles?.fontWeight || ''};
      text-decoration: ${block.styles?.textDecoration || ''};`
}
