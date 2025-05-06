import { ChangeEvent, useState } from 'react'
import { Block } from 'src/store/slices/siteSlice'
import { useAppDispatch } from 'src/store/store'
import { updateBlockContent } from 'src/store/slices/siteSlice/siteSlice'
import {
  ButtonBlock,
  HeaderBlock,
  OlListBlock,
  UlListBlock,
  ParagraphBlock,
  QuoteBlock,
  DividerBlock,
  ImageBlock,
  CheckboxBlock,
  RadioboxBlock,
  InputBlock,
  TextareaBlock,
  SelectBlock,
} from './blocks'

const blockComponentMap = {
  button: ButtonBlock,
  paragraph: ParagraphBlock,
  ul: UlListBlock,
  ol: OlListBlock,
  header: HeaderBlock,
  quote: QuoteBlock,
  divider: DividerBlock,
  image: ImageBlock,
  checkbox: CheckboxBlock,
  radiobox: RadioboxBlock,
  input: InputBlock,
  textarea: TextareaBlock,
  select: SelectBlock,
} as const

type BlockRendererProps = {
  block: Block
  isEditing:boolean
}

export const BlockRenderer = ({ block, isEditing }: BlockRendererProps) => {
  const dispatch = useAppDispatch()
  const Component = blockComponentMap[block.type]

  if (!Component) return <div>Unsupported block: {block.type}</div>

  const handleChange = (content:Block['content']) => {
    dispatch(updateBlockContent({ id: block.id, content }))
  }

  return (
      <Component
        blockId={block.id}
        content={block.content}
        isEditing={isEditing}
        onChange={handleChange}
        styles={block.styles}
      /> 
  )
}
