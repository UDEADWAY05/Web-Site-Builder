import { Block } from 'src/store/slices/siteSlice'

export type ImageBlockProps = {
  content: { url: string; alt: string }
  isEditing: boolean
  onChange: (newContent: { url: string; alt: string }) => void
  styles: Block['styles']
}

export const ImageBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: ImageBlockProps) => {
  console.log(styles)

  return isEditing ? (
    <div>
      <form className="flex flex-col space-y-2">
        <input
          type="text"
          value={content.url}
          onChange={(e) => onChange({ url: e.target.value, alt: 'image' })}
          placeholder="Edit src image"
          className="border p-2 w-full"
        />
      </form>
    </div>
  ) : (
    <img
      style={{
        ...styles,
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
      }}
      src={`${content.url}`}
      alt={content.alt}
    />
  )
}
