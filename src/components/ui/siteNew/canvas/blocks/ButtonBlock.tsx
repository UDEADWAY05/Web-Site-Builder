import { useState } from 'react'
import { Input } from 'src/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'
import { Block } from 'src/store/slices/siteSlice'

export type ButtonBlockProps = {
  content: { text: string; type: string; script: string }
  isEditing: boolean
  onChange: (newContent: Block['content']) => void
  width: number
  height: number
  styles: Block['styles']
}

const BUTTON_TYPE = ['button', 'submit', 'reset'] as const

export const ButtonBlock = ({
  content,
  onChange,
  isEditing,
  width,
  height,
  styles,
}: ButtonBlockProps) => {
  const [isEditingScript, setIsEditingScript] = useState(false)

  const handleTypeChange = (value: string) => {
    onChange({
      ...content,
      type: value,
    })
  }
  const handleTextChange = (value: string) => {
    onChange({
      ...content,
      text: value,
    })
  }

  const handleScriptChange = (value: string) => {
    onChange({
      ...content,
      script: value,
    })
  }

  const toggleScriptEditing = () => {
    setIsEditingScript((prev) => !prev)
  }

  return isEditing ? (
    <div className="flex flex-col gap-2">
      <form className="flex gap-2">
        <Input
          type="text"
          value={content.text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Edit text"
        />

        <Select value={content.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="select type" />
          </SelectTrigger>
          <SelectContent>
            {BUTTON_TYPE.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          type="button"
          className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
          onClick={toggleScriptEditing}
        >
          {isEditingScript ? 'Hide script' : 'Edit script'}
        </button>
      </form>
      {isEditingScript && (
        <div className="flex flex-col gap-2">
          <label>Custom Script:</label>
          <textarea
            value={content.script}
            onChange={(e) => handleScriptChange(e.target.value)}
            placeholder="Напишите свой кастомный script или используй пример ниже
            
            const button = document.querySelector('button')
           button?.addEventListener('click', () => {
           alert('Message')})"
            className="w-full p-2 border rounded min-h-[100px] font-mono text-sm"
          />
        </div>
      )}
    </div>
  ) : (
    <button
      type={content.type as 'button' | 'submit' | 'reset'}
      style={{
        ...styles,
        width: `${width}px`,
        height: `${height}px`,
        whiteSpace: 'normal',
      }}
    >
      {content.text}
    </button>
  )
}
