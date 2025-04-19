import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group'

export type RadioboxBlockProps = {
  content: string[]
  isEditing: boolean
  onChange: (items: string[]) => void
}

export const RadioboxBlock = ({
  content,
  isEditing,
  onChange,
}: RadioboxBlockProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(content[0] || '')

  const updateItem = (index: number, newValue: string) => {
    const updated = [...content]
    updated[index] = newValue
    onChange(updated)
  }

  const addItem = () => {
    onChange([...content, ''])
  }
  const removeItem = (index: number) => {
    const newItems = content.filter((_, i) => i !== index)
    onChange(newItems)
    // Если удалили выбранный элемент, сбрасываем выбор
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
        </div>
      ))}
      <Button type="button" onClick={addItem}>
        + Add item
      </Button>
    </form>
  ) : (
    <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
      {content.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={item} id="radiobox" />
          <Label htmlFor="radiobox">{item}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
