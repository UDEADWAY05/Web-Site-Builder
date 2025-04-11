import { Block } from 'src/store/slices/layoutSite'

export const generateHTMLCode = (block: Block) => {
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
