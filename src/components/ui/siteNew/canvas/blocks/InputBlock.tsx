import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice'

export type InputBlockProps = {
    content: string
    isEditing: boolean
    onChange: (newContent: string) => void
    width: number,
    height: number
    styles: Block['styles']
}

export const InputBlock = ({
    content,
    isEditing,
    onChange,
    width,
    height,
    styles,
}: InputBlockProps) => {
    return isEditing ? (
        <form className="flex">
            <Input
                type="text"
                value={content}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Edit text"
                className='bg-white'
            />
        </form>
    ) : (
        <form style={styles} className="flex flex-col gap-2">
            <Input
                id={content}
                type="text"
                value={content}
                placeholder="Edit text"
                style={{ ...styles, background: '#ffffff', width: `${width}px`, height: `${height}px` }}
                onChange={(e) => e.target.value}
            />
        </form>
    )
}
