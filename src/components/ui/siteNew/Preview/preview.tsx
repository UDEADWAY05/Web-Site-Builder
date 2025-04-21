import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { child, dbSite, get, off, ref } from 'src/App'
import { selectorLayoutSiteData } from 'src/store/slices/siteSlice/selectors'
import { useAppSelector } from 'src/store/store'
import { generateHTMLCode } from 'src/utils/generateHTMLCode'
import { generateCSSCode } from 'src/utils/generateCSSCode'
import type { Site } from 'src/store/slices/siteSlice/types'

export function Preview() {
  const blocks = useAppSelector(selectorLayoutSiteData)
  const { siteId } = useParams()

  // логику получения siteById вынести в slice
  // временная заглушка
  const [siteById, setSiteById] = useState<Site>()

  useEffect(() => {
    const dbRef = ref(dbSite)
    get(child(dbRef, `sites/${siteId}`))
      .then((snapsot) => {
        if (snapsot.exists()) {
          setSiteById(snapsot.val())
        } else {
          console.log('No data')
        }
      })
      .catch((err) => console.log(err))
    return off(dbRef) // Функция для отписки
  }, [siteId])

  //////////

  const documentContent = `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteById?.title || 'My project'}</title>
    <style>
      body {
        position: relative;
         margin:5px;
         width: 100wh;
        padding: 5px;
        box-sizing: border-box;
        min-height: 100vh;
        margin: 0;
        padding: 2px;
        background-color: ${siteById?.bgColor || '#ffffff'};
      }
      .container {
        position: absolute;
        box-sizing: border-box;
        min-height: 100vh;
        width:100%
      }
        ${blocks
          ?.map(
            (block) => `
          ${block.styles ? generateCSSCode(block) : ''}
        }
      `
          )
          .join('')}
             ${blocks
               ?.map((block) => `${block.styles ? generateCSSCode(block) : ''}`)
               .join('')}
    </style>
  </head>
  <body>
  <div class="container">
    ${blocks?.map((block) => `${generateHTMLCode(block)}`).join('\n')}
    </div>  
    ${blocks?.map((block) => ` ${generateHTMLCode(block)} `).join('\n')}
  </body>
  </html>`

  return (
    <iframe
      title="Preview"
      style={{ width: '50%', height: '600px' }}
      srcDoc={documentContent}
    />
  )
}
