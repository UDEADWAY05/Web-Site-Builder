import { JSX } from 'react'
import { Block } from 'src/store/slices/siteSlice'
import { HeaderBlockType } from 'src/store/slices/siteSlice/types'

interface HeaderBlockProps {
    content: HeaderBlockType['content']
    width: number
    height: number
    isEditing: boolean
    onChange: (newContent: HeaderBlockType['content']) => void
    styles: Block['styles']
   
}

const HEADER_LEVELS: number[] = [1, 2, 3, 4, 5, 6]

export const HeaderBlock = ({ content, isEditing, onChange, styles }: HeaderBlockProps) => {
  const Tag = `h${content.level}` as keyof JSX.IntrinsicElements;


  return isEditing ? (
    <form className="flex gap-2">
      <input
        type="text"
        value={content.text}
        onChange={(e) =>
          onChange({
            text: e.target.value,
            level: content.level,
          })
        }
        placeholder="Edit text"
        className="border p-2 w-full"
      />
      <select
        value={content.level}
        onChange={(e) =>
          onChange({
            text: content.text,
            level: Number(e.target.value),
          })
        }
        className="border p-2"
      >
        {HEADER_LEVELS.map((level) => (
          <option key={level} value={level}>{`h${level}`}</option>
        ))}
      </select>
    </form>
  ) : (
    <Tag style={styles}>
      {content.text}
    </Tag>
  );
};
