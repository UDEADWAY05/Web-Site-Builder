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
  return isEditing ? (
    <form className="flex">
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
  ) : (
    <img style={styles} src={`${content.url}`} alt={content.alt} />
  )
}
