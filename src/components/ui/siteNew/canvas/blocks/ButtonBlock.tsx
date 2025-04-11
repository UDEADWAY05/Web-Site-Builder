import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"

export type ButtonBlockProps = {
    content: string
    isEditing: boolean
    onChange: (newContent: string) => void
  }
  
  export const ButtonBlock = ({ content, isEditing, onChange }: ButtonBlockProps) => {
    return isEditing ? (
      <Input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        className="border p-2 w-full"
      />
    ) : (
      <Button variant={'secondary'}>{content}</Button>
    )
  }
  