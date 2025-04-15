import { Block } from 'src/store/slices/siteSlice'

export const generateCSSCode = (block: Block) => {
  return `
  .${block.type}-${block.id}
     { position:absolute;
      left: ${block.styles?.left || 0}; 
      top: ${block.styles?.top || 0}; 
      height: ${block.styles?.height || 'auto'}; 
      width: ${
        block.type !== 'divider' ? `${block.styles?.width || 'auto'}` : '100%'
      };
        `
}
