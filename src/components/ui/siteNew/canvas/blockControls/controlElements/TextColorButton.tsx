import { useState, useRef, useEffect } from 'react'
import { Block } from 'src/store/slices/siteSlice'
import { useAppDispatch } from 'src/store/store'
import { updateBlockStylesThunk } from 'src/store/slices/projectSlice/thunks'

interface TextColorButtonProps {
  id: string
  styles: Block['styles']
  // onChangeColor: (color: string) => void
}

export const TextColorButton = ({id, styles}: TextColorButtonProps) => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const handleColorChange = (color: string) => {
      dispatch(
        updateBlockStylesThunk({
          id,
          styles: { ...styles, color },
        })
      )
    }

  const toggleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="w-8 h-8 flex flex-col items-center justify-center relative hover:bg-gray-100 rounded"
      >
        <span className="text-lg font-bold leading-none">T</span>
        <span
          className="absolute bottom-1 w-4 h-0.5"
          style={{ backgroundColor: styles.color }}
        />
      </button>

      {open && (
        <input
          ref={inputRef}
          type="color"
          value={styles.color}
          // onChange={(e) => onChangeColor(e.target.value)}
          onChange={(e) => handleColorChange(e.target.value)}
          className="absolute top-12 left-1/2 transform -translate-x-1/2 border rounded p-0 w-8 h-8 cursor-pointer"
        />
      )}
    </div>
  )
}
