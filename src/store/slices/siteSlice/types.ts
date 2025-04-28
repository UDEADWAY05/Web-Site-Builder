import { CSSProperties } from 'react'

export interface BlockButtonType {
  type: Block['type']
  label: string
  img: string
}
export interface LayoutSiteState {
  entities: Site | null
  isPreview: boolean
  isModalOpen: boolean
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
  selectedBlockButton:BlockButtonType | null
  selectedBlockId:Block['id']
  isPreview: boolean
  isModalOpen: boolean
  selectedBlock: Block | null
}
