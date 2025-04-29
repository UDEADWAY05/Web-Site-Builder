import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice'

export type ButtonBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles: Block['styles']
}

export const ButtonBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: ButtonBlockProps) => {
  return isEditing ? (
    <Input
      type="text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Edit text"
      style={styles}
    />
  ) : (
    <Button style={styles} variant={'secondary'}>
      {content}
    </Button>
  )
}
