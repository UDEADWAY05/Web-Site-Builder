import {
  selectorLayoutSiteData,
  selectSiteData,
} from 'src/store/slices/siteSlice/selectors'
import { useAppSelector } from 'src/store/store'
import { generateHTMLCode } from 'src/utils/generateHTMLCode'
import { generateCSSCode } from 'src/utils/generateCSSCode'
import { useTransformData } from 'src/hooks/useTransformData'
import { generateScriptButton } from 'src/utils/generateScript'

export function Preview() {
  const blocks = useAppSelector(selectorLayoutSiteData)
  const { blocksForm, blocksBase } = useTransformData(blocks)
  const siteData = useAppSelector(selectSiteData)

  const documentContent = `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteData?.title || 'Мой проект'}</title>
    <style>
      body {
        position: relative;
         margin:5px;
         padding: 5px;
         background-color: ${siteData?.bgColor || '#ffffff'};
             ${blocks
               ?.map((block) => `${block.styles ? generateCSSCode(block) : ''}`)
               .join('')}
    </style>
  </head>
  <body>
    ${blocksBase.map((block) => `${generateHTMLCode(block)} `).join('\n')}
    ${`<form>
      ${blocksForm.map((block) => `${generateHTMLCode(block)} `).join('\n')}
        </form> `}
  <script>
        ${generateScriptButton(blocks)}
   </script>
  </body>
  </html>`

  return (
    <div className="relative w-full">
      <iframe
        title="Preview"
        style={{ width: '100%', height: '100%' }}
        srcDoc={documentContent}
      />
    </div>
  )
}
