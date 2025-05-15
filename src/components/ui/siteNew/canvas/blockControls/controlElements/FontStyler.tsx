interface PossibleFontStyles {
  fontSize?: number
  fontWeight?: "normal" | "bold"
  fontStyle?: "normal" | "italic"
  textDecoration?: "none" | "underline"
}

interface FontStylerProps {
    styles: PossibleFontStyles
    onChange: (newStyles: PossibleFontStyles) => void
  }

  export const FontStyler = ({ styles, onChange }: FontStylerProps) => {
    const toggleStyle = <K extends keyof PossibleFontStyles>(key: K, value: PossibleFontStyles[K]) => {
      onChange({
        ...styles,
        [key]: styles[key] === value ? undefined : value,
      })
    }
  
    return (
      <div className="flex gap-1 items-center p-2 text-sm">
        <button
          className="hover:bg-gray-300 cursor-pointer p-2"
          onClick={() => toggleStyle('fontWeight', 'bold')}
        >
          <span>B</span>
        </button>
  
        <button
          className="hover:bg-gray-300 cursor-pointer p-2"
          onClick={() => toggleStyle('fontStyle', 'italic')}
        >
          <span>I</span>
        </button>
  
        <button
          className="hover:bg-gray-300 cursor-pointer p-2"
          onClick={() => toggleStyle('textDecoration', 'underline')}
        >
          <span>U</span>
        </button>
      </div>
    )
  }