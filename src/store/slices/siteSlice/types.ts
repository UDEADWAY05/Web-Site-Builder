// export interface Block {
//   content: string | number
//   id: number
//   type: string
//   title: string
//   bgColor: string
//   styles?: {
//     width?: number | string
//     height?: number | string
//     left: string | number
//     top: string | number
//   }
// }

import { CSSProperties } from "react";

// export interface BlockButtonProp {
//   type: string
//   label: string
//   defaultContent: string | string[]
//   img: string
// }
// export interface LayoutSiteState {
//   entities: Site | null
// }

// export interface Site {
//   id: string
//   title: string
//   bgColor: string
//   data: Block[] | []
// }

export interface BlockButton {
  type: Block['type']
  label: string
  // defaultContent: Block['content']
  img: string
}
export interface LayoutSiteState {
  entities: Site | null
  isPreview: boolean
  isModalOpen: boolean
}

export type BlockStyles = {
  padding?: string
  margin?: string
  backgroundColor?: string
  fontSize?: string
  fontWeight?: string
  color?: string
  position?:string
  responsive?: { //maybe we will make responsive sizes
    mobile?: Partial<BlockStyles>
    tablet?: Partial<BlockStyles>
    desktop?: Partial<BlockStyles>
  };
  width?: string //TODO maybe number is better?
  height?: string //
  minHeight?:string //
  left?: string //
  top?: string //
  border?:string
  cursor?:string
  zIndex?:number
};

export interface BaseBlock {
  id:string
  // styles: BlockStyles
  styles:CSSProperties
} 

export type TextBlock = BaseBlock & {
  type:'text'
  content: string
}

export type HeaderBlock = BaseBlock & {
  type:'header',
  content:string
}

export type ParagraphBlock = BaseBlock & {
  type:'paragraph',
  content:string
}

export type ImageBlock = BaseBlock & {
  type: 'image'
  content: {
    src: string
    alt?: string
  }
}

export type ButtonBlock = BaseBlock & {
  type: 'button'
  content: {
    text:string
    onClick?: () => void
  }
}

export type UnorderedListBlock = BaseBlock & {
  type: 'ul'
  content: {
    items: string[]
  }
};

export type OrderedListBlock = BaseBlock & {
  type: 'ol'
  content: {
    items: string[]
  }
}

export type DividerBlock = BaseBlock & {
  type:'divider'
  content:string
}

export type QuoteBlock = BaseBlock & {
  type:'quote'
  content:string
}

export type Block =
  | TextBlock
  | ParagraphBlock
  | HeaderBlock
  | ImageBlock
  | ButtonBlock
  | UnorderedListBlock
  | OrderedListBlock
  | DividerBlock
  | QuoteBlock

export interface Site {
  id: string
  title: string
  bgColor: string
  blocks: Array<Block>
  isPreview: boolean
  isModalOpen: boolean
}