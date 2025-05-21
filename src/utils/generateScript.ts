import { Block } from 'src/store/slices/siteSlice'

export function generateScriptButton(blocks: Block[]) {
  const findScript = blocks.find((block) => block.type === 'button')?.content
    .script

  return findScript || ''
}
