import { useState, useRef, useEffect } from 'react'

interface FontSizeButtonProps {
  fontSize: number
  onChangeFontSize: (size: number) => void
}

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32]

export const FontSizeButton = ({
  fontSize,
  onChangeFontSize,
}: FontSizeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (size: number) => {
    onChangeFontSize(size)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleDropdown}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
      >
        <span className="text-sm">{fontSize}</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white shadow-md rounded p-1 flex flex-col z-20">
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => handleSelect(size)}
              className="px-2 py-1 hover:bg-gray-100 text-sm"
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
