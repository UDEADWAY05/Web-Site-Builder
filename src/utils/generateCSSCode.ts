import { Block } from 'src/store/slices/layoutSite'

export const generateCSSCode = (block: Block) => {
  return `
  .${block.type}-${block.id}
     { left: ${block.styles?.left}, 
      top: ${block.styles?.top}, 
      height: ${block.styles?.height}, 
      width: ${block.styles?.width},
      position:'absolute'}
  `
}
