interface PossibleFontStyles {
  fontSize?: number
  fontWeight?: 'normal' | 'bold'
  fontStyle?: 'normal' | 'italic'
  textDecoration?: 'none' | 'underline'
}

interface FontStylerProps {
  styles: PossibleFontStyles
  onChange: (newStyles: PossibleFontStyles) => void
}

export const FontStyler = ({ styles, onChange }: FontStylerProps) => {
  const toggleStyle = <K extends keyof PossibleFontStyles>(
    key: K,
    value: PossibleFontStyles[K]
  ) => {
    onChange({
      ...styles,
      [key]: styles[key] === value ? undefined : value,
    })
  }

  return (
    <div className="flex gap-1 px-2 items-center  text-sm">
      <button
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black "
        onClick={() => toggleStyle('fontWeight', 'bold')}
      >
        <span>B</span>
      </button>

      <button
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black "
        onClick={() => toggleStyle('fontStyle', 'italic')}
      >
        <span>I</span>
      </button>

      <button
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black "
        onClick={() => toggleStyle('textDecoration', 'underline')}
      >
        <span>U</span>
      </button>
    </div>
  )
}
