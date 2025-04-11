import { Block } from 'src/store/slices/layoutSite'
import { ButtonBlock, HeaderBlock, ListBlock, ParagraphBlock,QuoteBlock } from './blocks'

const blockComponentMap = {
  button: ButtonBlock,
  paragraph: ParagraphBlock,
  ul: ListBlock,
  ol: ListBlock,
  header:HeaderBlock,
  quote:QuoteBlock
} as const

type BlockType = keyof typeof blockComponentMap

type BlockRendererProps = {
  type: BlockType
  content: Block['content']
  isEditing: boolean
  onChange: (value: any) => void
  styles?: React.CSSProperties
}

export const BlockRenderer = ({
  type,
  content,
  isEditing,
  onChange,
  // styles,
}: BlockRendererProps) => {
  const Component = blockComponentMap[type]

  if (!Component) return <div>Unsupported block: {type}</div>

  return (
    <Component
      content={content}
      isEditing={isEditing}
      onChange={onChange}
      // styles={styles}
    />
  )
}
