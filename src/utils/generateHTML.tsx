import { generateHTMLCode } from 'src/utils/generateHTMLCode'
import type { Block, Site } from 'src/store/slices/siteSlice/types'
import { useTransformData } from '../hooks/useTransformData'

export function generateHTML(blocks: Block[], siteById: Site) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { blocksForm, blocksBase } = useTransformData(blocks)
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteById?.title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body 
  style="background-color: ${siteById?.bgColor};position: relative;
   min-height: 100vh;">
   ${blocksBase.map((block) => `${generateHTMLCode(block)} `).join('\n')}
    ${`<form">
      ${blocksForm.map((block) => `${generateHTMLCode(block)} `).join('\n')}
        </form> `}
  <script src="script.js"></script>
</body>
</html>`
}
