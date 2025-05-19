import { Checkbox } from 'src/components/ui/checkbox'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Block } from 'src/store/slices/siteSlice'

export type CheckboxBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles: Block['styles']
}

export const CheckboxBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: CheckboxBlockProps) => {
  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        className="border p-2 w-full"
      />
    </form>
  ) : (
    <form style={styles} className="flex text-center gap-3">
      {/* заглушка, поправить id  */}
      <Checkbox id="checkbox" />
      <Label htmlFor="checkbox">{content}</Label>
    </form>
  )
}
