import { Input } from 'src/components/ui/input'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { Block } from 'src/store/slices/siteSlice/types'
import { useAppDispatch } from 'src/store/store'

export type ListBlockProps = {
  content: string[]
  isEditing: boolean
  onChange: (items: string[]) => void
  width: number
  height: number
  styles: Block['styles']
}

export const UlListBlock = ({
  content,
  isEditing,
  onChange,
  width,
  height,
  styles,
}: ListBlockProps) => {
  const dispatch = useAppDispatch()
  const updateItem = (index: number, newValue: string) => {
    const updated = [...content]
    updated[index] = newValue
    onChange(updated)
  }

  const addItem = () => onChange([...content, ''])
  const removeItem = (index: number) =>
    onChange(content.filter((_, i) => i !== index))

  return isEditing ? (
    <ul style={{ ...styles, width: `${width}px`, height: `${height}px` }}>
      {content.map((item, index) => (
        <li key={index} className="flex">
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <button
            onClick={() => removeItem(index)}
            className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
          >
            x
          </button>
          <button
            type="button"
            onClick={() => dispatch(setEditingBlockId(null))}
            className="bg-gray-100 rounded p-2 hover:bg-gray-200"
          >
            Готово
          </button>
        </li>
      ))}
      <button onClick={addItem}>+ Add item</button>
    </ul>
  ) : (
    <ul style={{ ...styles, width: `${width}px`, height: `${height}px` }}>
      {content.map((item, i) => (
        <li style={styles} key={i}>
          {item}
        </li>
      ))}
    </ul>
  )
}
