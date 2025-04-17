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
} from './blocks'
import { useState } from 'react'

const blockComponentMap = {
  button: ButtonBlock,
  paragraph: ParagraphBlock,
  ul: UlListBlock,
  ol: OlListBlock,
  header: HeaderBlock,
  quote: QuoteBlock,
  divider: DividerBlock,
  image: ImageBlock,
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
}: // styles,
BlockRendererProps) => {
  const [headerLevel, setHeaderLevel] = useState(1)
  const Component = blockComponentMap[type]

  if (!Component) return <div>Unsupported block: {type}</div>

  return (
    <Component
      content={content}
      isEditing={isEditing}
      onChange={onChange}
      // styles={styles}
      level={headerLevel}
      onLevelChange={setHeaderLevel}
    />
  )
}
