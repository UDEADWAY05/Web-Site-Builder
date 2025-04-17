export type ParagraphBlockProps = {
    content: string
    isEditing: boolean
    onChange: (newContent: string) => void
    // styles:Block['styles']
  }
  
  export const ParagraphBlock = ({ content, isEditing, onChange }: ParagraphBlockProps) => { 
    return (
    
    <article className="p-2 w-full resize-none overflow-hidden">
      { isEditing 
        ? <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}

          /> 
        : <p>{content}</p>
      }
    </article>
    )
  }
  