import { Block } from 'src/store/slices/siteSlice'

export type ParagraphBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  width: number
  height: number
  styles: Block['styles']
}

export const ParagraphBlock = ({ content, onChange, styles, width, height }: ParagraphBlockProps) => {
  return (
    <textarea 
      value={content}
      onChange={e => onChange(e.target.value)} 
      style={{...styles,width:`${width}px`,height:`${height}px`, resize:'none'}}
    />
  )
}
