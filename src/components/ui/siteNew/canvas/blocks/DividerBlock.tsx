import { Block } from 'src/store/slices/siteSlice'

export type DividerBlockProps = {
  styles: Block['styles']
}

export const DividerBlock = ({ styles }: DividerBlockProps) => {
  console.log('d styles',styles)

  return <hr style={{backgroundColor:'black', height:'5px',border:'none'}} />
}


