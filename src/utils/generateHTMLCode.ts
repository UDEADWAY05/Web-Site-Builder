import { Block } from 'src/store/slices/siteSlice'

export const generateHTMLCode = (block: Block) => {
  switch (block.type) {
    case 'header':
      return `<h${block.content.level} class="${block.type}-${block.id}">${block.content.text}</h$>`
    case 'paragraph':
      return `<p class="${block.type}-${block.id}">${block.content}</p>`
    case 'ul':
      return `<ul class="${block.type}-${block.id}">
  ${block.content.map((item) => `<li >${item}</li>`).join('\n')}
</ul>`
    case 'ol':
      return `<ol class="${block.type}-${block.id}">
  ${block.content.map((item) => `<li >${item}</li>`).join('\n')}
</ol>`
    case 'image':
      return `<img src=${block.content.url} alt=${block.content.alt} class="${block.type}-${block.id}"/>`
    case 'divider':
      return `<hr class="${block.type}-${block.id}"/>`
    case 'button':
      return `<button class="${block.type}-${block.id}">${block.content}</button>`
    case 'quote':
      return `
       <blockquote 
          cite="https://www.huxley.net/bnw/four.html"
          class="${block.type}-${block.id}">
    <p >
      Words can be like X-rays, if you use them properly—they’ll go
      through anything. You read and you’re pierced.
    </p>
  </blockquote>
  <p>
    —Aldous Huxley, <cite>Brave New World</cite>
  </p> `

    /// form ///
    case 'checkbox':
      return `<form class="${block.type}-${block.id}">
    <input 
      type="checkbox" 
      id='${block.id}'
      name='${block.id}'
      checked />
    <label for='${block.id}'>${block.content}</label>
  </form>`

    case 'radiobox':
      return `<form class="${block.type}-${block.id}">
 ${block.content
   .map(
     (item) =>
       ` <input 
    type="radio" 
    id='${item}'
    name='${block.id}'
    value='${item}'
    checked />
  <label for='${item}'>${item}</label>`
   )
   .join('\n')}
</form>`

    case 'input':
      return `<form class="${block.type}-${block.id}">
    <input 
      type="text" 
      id='${block.id}'
      
    />
    <label for='${block.id}'>${block.content}</label>
  </form>`

    case 'textarea':
      return `<form class="${block.type}-${block.id}">
    <textarea 
      id='${block.id}'
      rows='5'
      cols='33'
        >
      ${block.content}
      </textarea>
      </form>`

    case 'select':
      return `<select 
        name=${block.id} 
        id=${block.id}
        class="${block.type}-${block.id}"
        >
  <option value="">--Please choose an option--</option>
${block.content.map((value) => `<option value=${value}>${value}</option>`)}
</select>`

    default:
      return ''
  }
}
