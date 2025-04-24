import { Block } from 'src/store/slices/siteSlice'

export type DividerBlockProps = {
  styles: Block['styles']
}

export const DividerBlock = ({ styles }: DividerBlockProps) => {
  return <hr style={styles} />
}
