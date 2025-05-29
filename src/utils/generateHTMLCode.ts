import { Block } from 'src/store/slices/siteSlice'

export const generateHTMLCode = (block: Block) => {
  switch (block.type) {
    case 'header':
      return `<h${block.content.level} class="${block.type}-${block.id}">${block.content.text}</h${block.content.level}>`

    case 'paragraph':
      return `<p class="${block.type}-${block.id}">${block.content}</p>`

    case 'background':
      return `<div class="${block.type}-${block.id}"></div>`

    case 'ul':
      return `<ul class="${block.type}-${block.id}">
  ${block.content.map((item) => `<li >${item}</li>`).join('\n')}
</ul>`

    case 'ol':
      return `<ol class="${block.type}-${block.id}">
  ${block.content.map((item) => ` <li >${item}</li>`).join('\n')}
</ol>`

    case 'image':
      return `<img src=${block.content.url} alt=${block.content.alt} class="${block.type}-${block.id}"/>`

    case 'divider':
      return `<hr class="${block.type}-${block.id}"/>`

    case 'button':
      return `<button type=${block.content.type} class="${block.type}-${block.id}">${block.content.text}</button>`

    case 'quote':
      return `
       <blockquote 
          class="${block.type}-${block.id}">
    <p >
      ${block.content}
    </p>
  </blockquote>
   `

    /// form ///
    case 'checkbox':
      return `<div class="${block.type}-${block.id}">
    <input 
      type="checkbox" 
      id='${block.id}'
      name='${block.id}'
      checked />
    <label for='${block.id}'>${block.content}</label>
  </div>`

    case 'radiobox':
      return `<div class="${block.type}-${block.id}">
 ${block.content
          .map(
            (item) =>
              ` <input 
    type="radio" 
    id='${item}'
    value='${item}'
    name='${block.id}'
    checked />
  <label for='${item}'>${item}</label>`
          )
          .join('\n')}
</div>`

    case 'input':
      return `<div class="${block.type}-${block.id}">
      <label for='${block.id}'>Поле для ввода текста</label>
    <input 
      type="text" 
      name='${block.id}'
      id='${block.id}'
      value=${block.content}
    />
    
  </div>`

    case 'textarea':
      return `<div class="${block.type}-${block.id}">
    <textarea 
      id='${block.id}'
      name='${block.id}'
      rows='5'
        >
      ${block.content}
      </textarea>
      </div>`

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
