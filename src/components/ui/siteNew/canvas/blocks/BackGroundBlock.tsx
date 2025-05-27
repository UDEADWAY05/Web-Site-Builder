import { Block } from 'src/store/slices/siteSlice'

export type BackgroundBlockProps = {
    width: number
    height: number
    styles: Block['styles']
}

export const BackgroundBlock = ({ styles, width, height }: BackgroundBlockProps) => {
    return (
        <div
            style={{ ...styles, minWidth: '50px', minHeight: '50px', width: `${width}px`, height: `${height}px`, resize: 'none' }}
        />
    )
}