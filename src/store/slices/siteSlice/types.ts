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
  position: { x: number; y: number }
  dimensions: {
    width: number
    height: number
  }
  type: string | null
  styles: {
    backgroundColor?: string
    color?: string
    borderColor?: string
    fontSize?: number
    fontWeight?: 'normal' | 'bold'
    fontStyle?: 'normal' | 'italic'
    textDecoration?: 'none' | 'underline'
  }
  zIndex: number
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
    alt: string
  }
}

export type ButtonBlockType = BaseBlockType & {
  type: 'button'
  content: {
    text: string
    type: string
    script: string
  }
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

export type BackGroundType = BaseBlockType & {
  type: 'background'
  content: string
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
  | BackGroundType

export interface Site {
  id: string;
  title: string
  bgColor: string
  blocks: Array<Block>
  createdAt: string;
  formScript: string;
}

export interface SiteSlice {
  data: Site;
  error: string | null;
  isLoading: boolean;
  isFetching: boolean;
  isPreview: boolean;
  isModalOpen: boolean;
  editingBlockId: Block['id'] | null
  selectedBlockButton: Block['type'] | null
  maxZIndex: number;
}

export interface SuccessResponse {
  success: true;
  data: Site[];
  lastKey: string | null;
  hasMore: boolean;
}

export interface ErrorResponse {
  success: false;
  message: string;
}
