import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { child, dbSite, get, off, ref } from 'src/App'
import { selectorLayoutSiteData } from 'src/store/slices/siteSlice/selectors'
import { Site } from 'src/store/slices/siteSlice/types'
import { useAppSelector } from 'src/store/store'
import { generateHTMLCode } from 'src/utils/generateHTMLCode'
import { transformData } from 'src/utils/transformData'

import { generateCSSCode } from 'src/utils/generateCSSCode'

export function Preview() {
  const blocks = useAppSelector(selectorLayoutSiteData)
  const { siteId } = useParams()

  // логику получения siteById вынести в slice
  // временная заглушка
  const [sites, setSites] = useState([])

  useEffect(() => {
    const dbRef = ref(dbSite)
    get(child(dbRef, 'sites'))
      .then((snapsot) => {
        if (snapsot.exists()) {
          setSites(snapsot.val())
        } else {
          console.log('No data')
        }
      })
      .catch((err) => console.log(err))
    return off(dbRef) // Функция для отписки
  }, [])

  const siteById: Site = transformData(sites).find((site) => site.id === siteId)

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
    </style>
  </head>
  <body>
  <div class="container">
    ${blocks?.map((block) => `${generateHTMLCode(block)}`).join('\n')}
    </div>  
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
