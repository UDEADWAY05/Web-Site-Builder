import { useState } from 'react'
import { Block } from 'src/store/slices/siteSlice'
import { useAppDispatch } from 'src/store/store'
import { deleteBlock, updateBlockContent } from 'src/store/slices/siteSlice/siteSlice'
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
  setIsEditing:(isEditing:boolean) => void
}

export const BlockRenderer = ({ block, isEditing, setIsEditing }: BlockRendererProps) => {
  const [editingContent, setEditingContent] = useState<Block['content']>(block.content)
  const dispatch = useAppDispatch()

  const Component = blockComponentMap[block.type]

  const onDelete = () => dispatch(deleteBlock(block.id))

  const onSave = () => {
    dispatch(updateBlockContent({ id: block.id, content: editingContent }))
    setIsEditing(false)
  }

  if (!Component) return <div>Unsupported block: {block.type}</div>

  return (
    <>
      {/* <div className="flex">
        <StylePanel
          styles={block.styles}
          onChange={(newStyles) =>
            dispatch(updateBlockStyles({ id: block.id, styles: newStyles }))
          }
        />
        <Controls
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={onSave}
          onCancel={() => setIsEditing(false)}
          onDelete={onDelete}
        />
      </div> */}

      <Component
        content={editingContent}
        isEditing={isEditing}
        onChange={setEditingContent}
        styles={block.styles}
      />
    </>
  )
}
