export type ParagraphBlockProps = {
    content: string
    isEditing: boolean
    onChange: (newContent: string) => void
    // styles:Block['styles']
  }
  
  export const ParagraphBlock = ({ content, isEditing, onChange }: ParagraphBlockProps) => { 
    return (
    
    <article className="p-2">
      { isEditing 
        ? <textarea wrap='soft' className="w-full resize-none overflow-hidden h-[8rem]"
            value={content}
            onChange={(e) => onChange(e.target.value)}

          /> 
        : <p className="w-full resize-none overflow-auto">{content}</p>
      }
    </article>
    )
  }
  