import { Block } from 'src/store/slices/siteSlice'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

export type ListBlockProps = {
  content: string[]
  isEditing: boolean
  onChange: (items: string[]) => void
  width: number
  height: number
  styles: Block['styles']
}

export const OlListBlock = ({
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
    <ol style={{ ...styles, width: `${width}px`, height: `${height}px` }}>
      {content.map((item, index) => (
        <li key={index} className="flex">
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <button
            onClick={() => removeItem(index)}
            className="bg-gray-100 rounded p-2 hover:bg-gray-200"
          >
            x
          </button>
          <button
            type="button"
            onClick={() => dispatch(setEditingBlockId(null))}
            className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
          >
            Готово
          </button>
        </li>
      ))}
      <Button onClick={addItem} variant={'secondary'}>
        + Add item
      </Button>
    </ol>
  ) : (
    <ol style={{ ...styles, width: `${width}px`, height: `${height}px` }}>
      {content.map((item, i) => (
        <li style={styles} key={i}>
          {item}
        </li>
      ))}
    </ol>
  )
}
