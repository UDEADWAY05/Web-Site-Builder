import { Block } from 'src/store/slices/siteSlice'
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

type BlockRendererProps = {
  block: Block
  isEditing: boolean
}

import { useAppDispatch } from 'src/store/store'
import { updateBlockContentThunk } from 'src/store/slices/siteSlice/thunk'
import { BackgroundBlock } from './blocks/BackGroundBlock'

export const BlockRenderer = ({ block, isEditing }: BlockRendererProps) => {
  const dispatch = useAppDispatch()

  const handleChange = (content: Block['content']) => {
    dispatch(updateBlockContentThunk({ id: block.id, content }))
  }

  switch (block.type) {
    case 'header':
      return (
        <HeaderBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
    case 'paragraph':
      return (
        <ParagraphBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
    case 'background':
      return (
        <BackgroundBlock
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
    case 'ul':
      return (
        <UlListBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
    case 'ol':
      return (
        <OlListBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
    case 'button':
      return (
        <ButtonBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
    case 'checkbox':
      return (
        <CheckboxBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          width={block.dimensions.width}
          height={block.dimensions.height}
          styles={block.styles}
        />
      )
    case 'divider':
      return (
        <DividerBlock
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
    case 'image':
      return (
        <ImageBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          width={block.dimensions.width}
          height={block.dimensions.height}
          styles={block.styles}
        />
      )
    case 'input':
      return (
        <InputBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          width={block.dimensions.width}
          height={block.dimensions.height}
          styles={block.styles}
        />
      )
    case 'quote':
      return (
        <QuoteBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          width={block.dimensions.width}
          height={block.dimensions.height}
          styles={block.styles}
        />
      )
    case 'radiobox':
      return (
        <RadioboxBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          width={block.dimensions.width}
          height={block.dimensions.height}
          styles={block.styles}
        />
      )
    case 'select':
      return (
        <SelectBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          width={block.dimensions.width}
          height={block.dimensions.height}
          styles={block.styles}
        />
      )
    case 'textarea':
      return (
        <TextareaBlock
          content={block.content}
          isEditing={isEditing}
          onChange={handleChange}
          styles={block.styles}
          width={block.dimensions.width}
          height={block.dimensions.height}
        />
      )
  }
}
