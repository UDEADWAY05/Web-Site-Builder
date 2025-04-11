import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { child, dbSite, get, off, ref } from 'src/App'
import { selectorLayoutSiteData } from 'src/store/slices/layoutSite/selectors'
import { Site } from 'src/store/slices/layoutSite/types'
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
    <title>${siteById?.title}</title>
    <style>
      body {
        position: relative;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        background-color: ${siteById?.bgColor || '#ffffff'};
      }
      .block {
        position: absolute;
        box-sizing: border-box;
      }
        ${blocks
          ?.map(
            (block) => `
        #block-${block.id} {
          left: ${block.styles?.left || 0}px;
          top: ${block.styles?.top || 0}px;
          width: ${block.styles?.width || 300}px;
          ${block.styles ? generateCSSCode(block) : ''}
        }
      `
          )
          .join('')}
    </style>
  </head>
  <body>
    ${blocks
      ?.map(
        (block) => `
      <div id="block-${block.id}" class="block">
        ${generateHTMLCode(block)}
      </div>
    `
      )
      .join('\n')}
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
