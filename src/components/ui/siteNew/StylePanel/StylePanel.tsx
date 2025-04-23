interface StylePanelProps {
  styles: React.CSSProperties
  onChange: (newStyles: React.CSSProperties) => void
}

export const StylePanel = ({ styles, onChange }: StylePanelProps) => {
  console.log('styles in panel', styles)
  const toggleStyle = (key: keyof React.CSSProperties, value: unknown) => {
    onChange({
      ...styles,
      [key]: styles[key] === value ? undefined : value,
    })
  }

  return (
    <div className="flex gap-3 items-center p-2 text-sm">
      <button
        className="hover:bg-gray-300 cursor-pointer"
        onClick={() => toggleStyle('fontWeight', 'bold')}
      >
        <span>B</span>
      </button>

      <button
        className="hover:bg-gray-300 cursor-pointer"
        onClick={() => toggleStyle('fontStyle', 'italic')}
      >
        <span>I</span>
      </button>

      <button
        className="hover:bg-gray-300 cursor-pointer"
        onClick={() => toggleStyle('textDecoration', 'underline')}
      >
        <span>U</span>
      </button>

      <div className="flex flex-col items-start">
        <span className="text-xs">Цвет текста</span>
        <input
          type="color"
          value={styles.color?.toString() || '#000000'}
          onChange={(e) => onChange({ ...styles, color: e.target.value })}
          title="font_color"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-xs">Цвет фона</span>
        <input
          type="color"
          value={styles.backgroundColor?.toString() || '#ffffff'}
          onChange={(e) =>
            onChange({ ...styles, backgroundColor: e.target.value })
          }
          title="Background color"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-xs">Размер шрифта</span>
        <input
          type="number"
          value={parseInt(styles.fontSize?.toString() || '16')}
          min={8}
          max={72}
          onChange={(e) =>
            onChange({ ...styles, fontSize: `${e.target.value}px` })
          }
          className="w-16 border px-1"
          title="Font size"
        />
      </div>
    </div>
  )
}
