export type QuoteBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
}

export const QuoteBlock = ({
  content,
  isEditing,
  onChange,
}: QuoteBlockProps) => {
  return isEditing ? (
    <input
      type="text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Edit text"
      className="border p-2 w-full"
    />
  ) : (
    <blockquote className="italic font-semibold">
      <p>{content}</p>
    </blockquote>
  )
}
