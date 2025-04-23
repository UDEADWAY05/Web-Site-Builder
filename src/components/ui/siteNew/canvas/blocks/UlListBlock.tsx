import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice/types'

export type ListBlockProps = {
  content: string[]
  isEditing: boolean
  onChange: (items: string[]) => void
  styles: Block['styles']
}

export const UlListBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: ListBlockProps) => {
  const updateItem = (index: number, newValue: string) => {
    const updated = [...content]
    updated[index] = newValue
    onChange(updated)
  }

  const addItem = () => onChange([...content, ''])
  const removeItem = (index: number) =>
    onChange(content.filter((_, i) => i !== index))

  return isEditing ? (
    <ul>
      {content.map((item, index) => (
        <li key={index}>
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <button onClick={() => removeItem(index)}>x</button>
        </li>
      ))}
      <button onClick={addItem}>+ Add item</button>
    </ul>
  ) : (
    <ul>
      {content.map((item, i) => (
        <li style={styles} key={i}>
          {item}
        </li>
      ))}
    </ul>
  )
}
