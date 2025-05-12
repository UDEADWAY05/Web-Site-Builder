import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import { generateHTML } from 'src/utils/generateHTML'
import { generateCSS } from 'src/utils/generateCSS'
import { Block } from 'src/store/slices/siteSlice'
import { Site } from 'src/store/slices/siteSlice/types'
import { generateScript } from './generateScript'

export async function exportSiteToZip(blocks: Block[], siteById: Site) {
  const zip = new JSZip()

  const htmlContent = generateHTML(blocks, siteById)
  const cssContent = generateCSS(blocks)
  const scriptContent = generateScript()

  //добавляем файлы в архив
  zip.file('index.html', htmlContent)
  zip.file('styles.css', cssContent)
  zip.file('script.js', scriptContent)

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'webSite.zip')
}
