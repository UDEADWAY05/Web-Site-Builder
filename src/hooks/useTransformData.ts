import { Block } from 'src/store/slices/siteSlice'

export function useTransformData(blocks: Block[]) {
  const FORM_BLOCK_TYPES = [
    'button',
    'checkbox',
    'input',
    'radiobox',
    'select',
    'textarea',
  ]
  const blocksBase: Block[] = []
  const blocksForm: Block[] = []

  for (const block of blocks) {
    if (FORM_BLOCK_TYPES.includes(block.type)) {
      blocksForm.push(block)
    } else {
      blocksBase.push(block)
    }
  }

  return { blocksBase, blocksForm }
}
