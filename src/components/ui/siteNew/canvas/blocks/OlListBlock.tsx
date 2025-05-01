import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice'

export type ListBlockProps = {
  content: string[]
  isEditing: boolean
  onChange: (items: string[]) => void
  styles: Block['styles']
}

export const OlListBlock = ({
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
    <ol>
      {content.map((item, index) => (
        <li key={index} className='flex'>
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <button 
            onClick={() => removeItem(index)}
            className='bg-gray-100 rounded p-2 hover:bg-gray-200'
          >
              x
          </button>
        </li>
      ))}
      <Button onClick={addItem}>+ Add item</Button>
    </ol>
  ) : (
    <ol>
      {content.map((item, i) => (
        <li style={styles} key={i}>
          {item}
        </li>
      ))}
    </ol>
  )
}
