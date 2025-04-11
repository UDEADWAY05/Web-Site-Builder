import { Input } from "src/components/ui/input"

export type HeaderBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
}

export const HeaderBlock = ({ content, isEditing, onChange }: HeaderBlockProps) => {
  return isEditing ? (
    <Input
      type="text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Edit text"
      className="border p-2 w-full"
    />
  ) : (
    <h1>{content}</h1>
  )
}
