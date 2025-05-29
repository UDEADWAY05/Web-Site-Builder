import { Block } from 'src/store/slices/siteSlice'

export function generateScriptButton(blocks: Block[], formScript: string) {
    const findScript = formScript + '' + blocks.reduce((acc, block) => {
    if (block.type === 'button') {
      return acc + ' ' + block.content.script
    } else {
      return acc
    }
  }, '')

    return findScript || ''
}
