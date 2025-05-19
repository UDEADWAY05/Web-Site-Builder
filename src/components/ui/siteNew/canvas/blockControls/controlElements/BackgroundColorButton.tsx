interface BackgroundColorInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BackgroundColorButton = ({
  value,
  onChange,
}: BackgroundColorInputProps) => {
  return (
    <div>
      <input
        id="backgroundColor"
        type="color"
        value={value}
        onChange={onChange}
        className="w-7 h-7 bg-gray-100 rounded hover:bg-gray-200 text-black"
      />
    </div>
  )
}
