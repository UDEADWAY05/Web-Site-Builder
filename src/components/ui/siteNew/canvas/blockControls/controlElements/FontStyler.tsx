import { Block } from "src/store/slices/siteSlice"
import { useAppDispatch } from "src/store/store"
import { updateBlockStylesThunk } from 'src/store/slices/siteSlice/thunk'
interface PossibleFontStyles {
  fontSize?: number
  fontWeight?: 'normal' | 'bold'
  fontStyle?: 'normal' | 'italic'
  textDecoration?: 'none' | 'underline'
}

interface FontStylerProps {
  id: Block['id']
  styles: PossibleFontStyles
}

export const FontStyler = ({ id, styles }: FontStylerProps) => {
  const dispatch = useAppDispatch()
  
  const toggleStyle = <K extends keyof PossibleFontStyles>(
    key: K,
    value: PossibleFontStyles[K]
  ) => {
    const newStyles = {...styles,[key]: value}

    dispatch(
      updateBlockStylesThunk({
        id,
        styles: { ...styles, ...newStyles },
      })
    )
  }

  const isBold = styles.fontWeight === 'bold'
  const isItalic = styles.fontStyle === 'italic'
  const isUnderlined = styles.textDecoration === 'underline'

  return (
    <div className="flex gap-1 px-2 items-center  text-sm">
      <button
        className={`bg-gray-100 rounded p-2 min-w-6 hover:bg-gray-200 text-black ${isBold && 'bg-gray-300'}`}
        onClick={() => toggleStyle('fontWeight', isBold ? 'normal' : 'bold')}
      >
        <span className={isBold ? 'bg-gray-300' : ''}>B</span>
      </button>

      <button
        className={`bg-gray-100 rounded p-2 min-w-6 hover:bg-gray-200 text-black ${isItalic && 'bg-gray-300'}`}
        onClick={() => toggleStyle('fontStyle', isItalic ? 'normal' : 'italic')}
      >
        <span>I</span>
      </button>

      <button
        className={`bg-gray-100 rounded p-2 min-w-6 hover:bg-gray-200 text-black ${isUnderlined && 'bg-gray-300'}`}

        onClick={() => toggleStyle('textDecoration', isUnderlined ? 'none' : 'underline')}
      >
        <span>U</span>
      </button>
    </div>
  )
}
