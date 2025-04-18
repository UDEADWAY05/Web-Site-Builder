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

type BlockType = keyof typeof blockComponentMap

type BlockRendererProps = {
  type: BlockType
  content: Block['content']
  isEditing: boolean
  onChange: (value: unknown) => void
  styles?: React.CSSProperties
}

export const BlockRenderer = ({
  type,
  content,
  isEditing,
  onChange,
}: // styles,
BlockRendererProps) => {
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
