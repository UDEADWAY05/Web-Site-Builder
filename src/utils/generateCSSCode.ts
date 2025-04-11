import { Block } from 'src/store/slices/layoutSite'

export const generateCSSCode = (block: Block) => {
  return `
  .${block.type}-${block.id}
     { left: ${block.styles?.left || 0}px; 
      top: ${block.styles?.top || 0}px; 
      height: ${block.styles?.height || 'auto'}; 
      width: ${
        block.type === 'divider' ? '100%' : `${block.styles?.width || 'auto'}`
      };
      position:absolute;
      }
  `
}
