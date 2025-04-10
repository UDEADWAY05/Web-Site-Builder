import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { child, dbSite, get, off, ref } from 'src/App'
import { Block } from 'src/store/slices/layoutSite'
import { selectorLayoutSiteData } from 'src/store/slices/layoutSite/selectors'
import { Site } from 'src/store/slices/layoutSite/types'
import { useAppSelector } from 'src/store/store'
import { transformData } from 'src/utils/transformData'

export function GenerateHTML() {
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

  const renderBlockToHTML = (block: Block) => {
    switch (block.type) {
      case 'header':
        return `<h1 class="${block.type}-${block.id}">${block.content}</h1>`
      case 'paragraph':
        return `<p class="${block.type}-${block.id}">${block.content}</p>`
      case 'listUl':
        return `<ul>
    ${block.content.map(
      (item) => `<li class="${block.type}-${block.id}">${item}</li>`
    )}
  </ul>`
      case 'listOl':
        return `<ol>
    ${block.content.map(
      (item) => `<li class="${block.type}-${block.id}">${item}</li>`
    )}
  </ol>`
      case 'image':
        return `<img src=${block.content} alt=${block.content} class="${block.type}-${block.id}"/>`
      case 'divider':
        return '<hr/>'
      case 'button':
        return `<button class="${block.type}-${block.id}">${block.content}</button>`
      case 'quote':
        return `
         <blockquote cite="https://www.huxley.net/bnw/four.html">
      <p>
        Words can be like X-rays, if you use them properly—they’ll go
        through anything. You read and you’re pierced.
      </p>
    </blockquote>
    <p>
      —Aldous Huxley, <cite>Brave New World</cite>
    </p> `
      default:
        return ''
    }
  }

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteById?.title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body style="background-color: ${siteById?.bgColor}">
  ${blocks?.map((block) => `${renderBlockToHTML(block)}`).join('\n')}
</body>
</html>`
}
