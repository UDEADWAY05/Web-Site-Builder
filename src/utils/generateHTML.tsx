import { generateHTMLCode } from 'src/utils/generateHTMLCode'
import type { Block, Site } from 'src/store/slices/siteSlice/types'

export function generateHTML(blocks: Block[], siteById: Site) {
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
  ${blocks?.map((block) => `${generateHTMLCode(block)}`).join('\n')}
</body>
</html>`
}
