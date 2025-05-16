import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'
import { Block } from 'src/store/slices/siteSlice'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

export type SelectBlockProps = {
  content: string[]
  isEditing: boolean
  onChange: (items: string[]) => void
  styles: Block['styles']
}

export const SelectBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: SelectBlockProps) => {
  const dispatch = useAppDispatch()
  const [selectedValue, setSelectedValue] = useState<string>(
    content[0] || 'empty'
  )

  const updateItem = (index: number, newValue: string) => {
    const updated = [...content]
    updated[index] = newValue
    onChange(updated)

    if (content[index] === selectedValue) {
      setSelectedValue(newValue)
    }
  }

  const addItem = () => {
    const newItems = [...content, 'empty']
    onChange(newItems)
    // Если это первый элемент, выбираем его
    if (newItems.length === 1) {
      setSelectedValue(newItems[0])
    }
  }
  const removeItem = (index: number) => {
    const newItems = content.filter((_, i) => i !== index)
    onChange(newItems)
    // Если удалили выбранный элемент, выбираем первый из оставшихся
    if (content[index] === selectedValue) {
      setSelectedValue(newItems[0] || '')
    }
  }

  return isEditing ? (
    <form>
      {content.map((item, index) => (
        <div key={index} className="flex gap-2 py-1">
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="Edit text"
            className="border p-2 w-full"
          />
          <Button type="button" onClick={() => removeItem(index)}>
            x
          </Button>
          <button
            type="button"
            onClick={() => dispatch(setEditingBlockId(null))}
            className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
          >
            Готово
          </button>
        </div>
      ))}
      <Button type="button" onClick={addItem}>
        + Add item
      </Button>
    </form>
  ) : (
    <Select
      value={selectedValue}
      onValueChange={setSelectedValue}
      disabled={content.length === 0}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {content.map((value) => (
          <SelectItem key={value} value={value} style={styles}>
            {value || ''}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
