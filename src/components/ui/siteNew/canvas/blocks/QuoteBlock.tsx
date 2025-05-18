import { Block } from 'src/store/slices/siteSlice'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

export type QuoteBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  width: number
  height: number
  styles: Block['styles']
}

export const QuoteBlock = ({
  content,
  isEditing,
  onChange,
  width,
  height,
  styles,
}: QuoteBlockProps) => {
  const dispatch = useAppDispatch()

  return isEditing ? (
    <form className="flex">
      <input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        style={{...styles,width:`${width}px`,height:`${height}px`}}
      />
      <button
        type="button"
        onClick={() => dispatch(setEditingBlockId(null))}
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
      >
        Готово
      </button>
    </form>
  ) : (
    <blockquote style={{...styles,width:`${width}px`,height:`${height}px`}}>
      {content}
    </blockquote>
  )
}
