import { selectorLayoutSiteData } from 'src/store/slices/layoutSite/selectors'

import { useAppSelector } from 'src/store/store'

export function GenerateHTML() {
  const blocks = useAppSelector(selectorLayoutSiteData)
  console.log(blocks)

  return (
    <div className=" outline-2 ">
      <h3 className="text-center">HTML</h3>

      {blocks
        ?.map((block) => {
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
          </p>
              `

            default:
              return ''
          }
        })
        .join('\n')}
    </div>
  )
}
