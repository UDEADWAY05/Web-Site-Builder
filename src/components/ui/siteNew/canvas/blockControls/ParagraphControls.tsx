import { useAppDispatch } from 'src/store/store'
import { TextColorButton } from './controlElements/TextColorButton'
import { FontSizeButton } from './controlElements/FontSizeButton'
import { BackgroundColorButton } from './controlElements/BackgroundColorButton'
import { FontStyler } from './controlElements/FontStyler'
import { Block } from 'src/store/slices/siteSlice'
import { updateBlockStylesThunk } from 'src/store/slices/projectSlice/thunks'

interface ParagraphContolProps {
  block: Block
}

export const ParagraphControls = ({block}: ParagraphContolProps) => {
  const dispatch = useAppDispatch()

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateBlockStylesThunk({
        id: block.id,
        styles: { ...block.styles, backgroundColor: e.target.value },
      })
    )
  }

  const onFontSizeChange = (size: number) =>
    dispatch(
      updateBlockStylesThunk({
        id: block.id,
        styles: { ...block.styles, fontSize: size },
      })
    )

  return (
    <div className="flex items-center gap-1 ">
      <FontStyler styles={block.styles} id={block.id} />
      <BackgroundColorButton
        value={block.styles.backgroundColor ?? ''}
        onChange={handleBackgroundColorChange}
      />
      <TextColorButton
        id={block.id}
        styles={block.styles}
      />
      <FontSizeButton
        fontSize={block.styles.fontSize ?? 16}
        onChangeFontSize={onFontSizeChange}
      />
    </div>
  )
}
