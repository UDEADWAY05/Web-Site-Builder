import React from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
// import { setBlockStyles } from 'src/store/slices/siteSlice/siteSlice'
import { updateBlockStyles } from 'src/store/slices/siteSlice/siteSlice'
import { selectBlockById, selectBlockId } from 'src/store/slices/siteSlice/selectors'

export const BoldToggle = () => {
  const dispatch = useAppDispatch()
  // const blockId = useAppSelector(selectBlockId)
  const block = useAppSelector(selectBlockById)

  if (!block) return null

  const isBold = block.styles?.fontWeight === 'bold'

  const toggleBold = () => {
    dispatch(
      updateBlockStyles({
        id: block.id,
        styles: { fontWeight: isBold ? 'normal' : 'bold' },
      })
    )
  }

  return (
    <button
      onClick={toggleBold}
      className={`px-2 py-1 rounded border ${isBold ? 'font-bold bg-gray-200' : ''}`}
    >
      B
    </button>
  )
}
