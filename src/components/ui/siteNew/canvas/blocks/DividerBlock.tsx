import { Block } from 'src/store/slices/siteSlice'

export type DividerBlockProps = {
  width:number
  height: number
  styles: Block['styles']
}

export const DividerBlock = ({ width, height, styles }: DividerBlockProps) => {
  console.log('styles in divider',styles)
  return <hr style={{...styles, width:`${width}px`, height:`${height}px`}} />
}


