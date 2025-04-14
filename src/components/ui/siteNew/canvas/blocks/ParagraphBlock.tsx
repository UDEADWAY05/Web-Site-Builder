export type ParagraphBlockProps = {
    content: string
    isEditing: boolean
    onChange: (newContent: string) => void
  }
  
  export const ParagraphBlock = ({ content, isEditing, onChange }: ParagraphBlockProps) => {
    return isEditing ? (
      <input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        className="border p-2 w-full"
      />
    ) : (
      <p>{content}</p>
    )
  }
  