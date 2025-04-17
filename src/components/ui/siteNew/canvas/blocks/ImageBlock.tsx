export type ImageBlockProps = {
  content: { url: string; alt: string }
  isEditing: boolean
  onChange: (newContent: { url: string; alt: string }) => void
}

export const ImageBlock = ({
  content,
  isEditing,
  onChange,
}: ImageBlockProps) => {
  return isEditing ? (
    <input
      type="text"
      value={content.url}
      onChange={(e) => onChange({ url: e.target.value, alt: 'image' })}
      placeholder="Edit src image"
      className="border p-2 w-full"
    />
  ) : (
    <img src={`${content.url}`} alt={content.alt} />
  )
}
