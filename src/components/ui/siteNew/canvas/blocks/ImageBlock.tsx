export type ImageBlockProps = {
  content: { src: string; alt: string }
  isEditing: boolean
  onChange: (newContent: string) => void
}

export const ImageBlock = ({
  content,
  isEditing,
  onChange,
}: ImageBlockProps) => {
  return isEditing ? (
    <input
      type="text"
      value={content.src}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Edit src image"
      className="border p-2 w-full"
    />
  ) : (
    <img src={`${content.src}`} alt={content.alt} />
  )
}
