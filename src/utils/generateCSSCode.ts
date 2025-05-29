import { Block } from 'src/store/slices/siteSlice'
import { transformHeight } from './transformHeight'
import { transformWidth } from './transformWidth'

const headerDivCss = `
    widht: fit-content;
    height: fit-content;
`

const checkboxDivCss = `
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const inputDivCss = `
    display: flex;
    flex-direction: column;
    gap: 4px;

    input {
        display: flex;
        flex-direction: column;
        padding: 8px 16px;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        outline: none;
    }
`

const textareaDivCss = `
    display: flex;
    flex-direction: column;
    gap: 4px;

    textarea {
        display: flex;
        justify-content: start;
        padding: 8px 16px;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        outline: none;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
`
const buttonDivCss = `
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    outline: none;
`

export const generateCSSCode = (block: Block) => {
    return `
  .${block.type}-${block.id} {
      font-family: 'Roboto', sans-serif;
      position:absolute;
      left: ${block.position.x || 0}px; 
      top: ${block.position.y || 0}px; 
      height: ${transformHeight(block)}; 
      width: ${transformWidth(block)};
      background-color: ${block.styles.backgroundColor || '#fafafa'};
      font-size: ${block.type === 'header' ? '' : block.styles?.fontSize || '14px'
        };
      font-style: ${block.styles?.fontStyle || 'normal'};
      font-weight: ${block.styles?.fontWeight || 'normal'};
      text-decoration: ${block.styles?.textDecoration || 'none'};
      color:${block.styles?.color || '#000000'};
      z-index:${block.zIndex};
      ${block.type === 'input' ? inputDivCss : ""}
      ${block.type === 'button' ? buttonDivCss : ''}
      ${block.type === 'textarea' ? textareaDivCss : ""}
      ${block.type === 'header' ? headerDivCss : ""}
      ${block.type === 'checkbox' ? checkboxDivCss : ""}
    }`
}
