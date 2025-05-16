import { Button } from '@headlessui/react'
import { Block } from 'src/store/slices/siteSlice'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

export type ImageBlockProps = {
  content: { url: string; alt: string }
  isEditing: boolean
  onChange: (newContent: { url: string; alt: string }) => void
  styles: Block['styles']
}

export const ImageBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: ImageBlockProps) => {
  const dispatch = useAppDispatch()

  const handleSizeChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target
    onChange({
      ...content,
      [name]: value,
    })
  }

  return isEditing ? (
    <div>
      <form className="flex flex-col space-y-2">
        <input
          type="text"
          value={content.url}
          onChange={(e) => onChange({ url: e.target.value, alt: 'image' })}
          placeholder="Edit src image"
          className="border p-2 w-full"
        />
        <Button
          type="button"
          onClick={() => dispatch(setEditingBlockId(null))}
          className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
        >
          Готово
        </Button>
      </form>
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-sm font-medium">Ширина</label>
          <input
            type="text"
            name="width"
            value={content.width || ''}
            onChange={handleSizeChange}
            placeholder="auto"
            className="border p-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Высота</label>
          <input
            type="text"
            name="height"
            value={content.height || ''}
            onChange={handleSizeChange}
            placeholder="auto"
            className="border p-2 w-full"
          />
        </div>
      </div>
    </div>
  ) : (
    <img
      style={{
        ...styles,
        width: content.width || '100%',
        height: content.height || 'auto',
        objectFit: 'cover',
        maxWidth: '100%',
      }}
      src={`${content.url}`}
      alt={content.alt}
    />
  )
}
