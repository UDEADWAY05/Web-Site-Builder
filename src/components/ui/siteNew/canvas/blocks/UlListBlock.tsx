import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'

export type ListBlockProps = {
  content: string[]
  isEditing: boolean
  onChange: (items: string[]) => void
}

export const UlListBlock = ({
  content,
  isEditing,
  onChange,
}: ListBlockProps) => {
  console.log(content)
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
          <Button onClick={() => removeItem(index)}>x</Button>
        </li>
      ))}
      <Button onClick={addItem}>+ Add item</Button>
    </ul>
  ) : (
    <ul>
      {content.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
