import { Block } from 'src/store/slices/siteSlice'

export function generateScriptButton(blocks: Block[]) {
  const findScript = blocks.reduce((acc, block) => {
    if (block.type === 'button') {
      return acc + ' ' + block.content.script
    } else {
      return acc
    }
  }, '')

  return findScript || ''
}
