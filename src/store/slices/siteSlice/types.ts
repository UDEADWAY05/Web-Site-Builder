import { CSSProperties } from 'react'

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
  position?: string
  responsive?: {
    //maybe we will make responsive sizes
    mobile?: Partial<BlockStyles>
    tablet?: Partial<BlockStyles>
    desktop?: Partial<BlockStyles>
  }
  width?: string //TODO maybe number is better?
  height?: string //
  minHeight?: string //
  left?: string //
  top?: string //
  border?: string
  cursor?: string
  zIndex?: number
}

export interface BaseBlockType {
  id: string
  styles: CSSProperties
}

export type TextBlockType = BaseBlockType & {
  type: 'text'
  content: string
}

export type HeaderBlockType = BaseBlockType & {
  type: 'header'
  content: {
    text: string
    level: number
  }
}

export type ParagraphBlockType = BaseBlockType & {
  type: 'paragraph'
  content: string
}

export type ImageBlockType = BaseBlockType & {
  type: 'image'
  content: {
    url: string
    alt?: string
  }
}

export type ButtonBlockType = BaseBlockType & {
  type: 'button'
  content: string
}

export type UnorderedListBlockType = BaseBlockType & {
  type: 'ul'
  content: string[]
}

export type OrderedListBlockType = BaseBlockType & {
  type: 'ol'
  content: string[]
}

export type DividerBlockType = BaseBlockType & {
  type: 'divider'
  content: string
}

export type QuoteBlockType = BaseBlockType & {
  type: 'quote'
  content: string
}

export type InputBlockType = BaseBlockType & {
  type: 'input'
  content: string
}

export type TextAreaBlockType = BaseBlockType & {
  type: 'textarea'
  content: string
}

export type SelectBlockType = BaseBlockType & {
  type: 'select'
  content: string[]
}

export type CheckBoxBlockType = BaseBlockType & {
  type: 'checkbox'
  content: string
}

export type RadioBoxBlockType = BaseBlockType & {
  type: 'radiobox'
  content: string[]
}

export type Block =
  | ParagraphBlockType
  | HeaderBlockType
  | ImageBlockType
  | ButtonBlockType
  | UnorderedListBlockType
  | OrderedListBlockType
  | DividerBlockType
  | QuoteBlockType
  | InputBlockType
  | TextAreaBlockType
  | SelectBlockType
  | CheckBoxBlockType
  | RadioBoxBlockType

export interface Site {
  id: string
  title: string
  bgColor: string
  blocks: Array<Block>
  isPreview: boolean
  isModalOpen: boolean
}
