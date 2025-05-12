import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectorLayoutSiteData } from 'src/store/slices/siteSlice/selectors'
import { useAppSelector } from 'src/store/store'
import { generateHTMLCode } from 'src/utils/generateHTMLCode'
import { generateCSSCode } from 'src/utils/generateCSSCode'
import { selectSiteById } from 'src/store/slices/projectSlice/selectors'
import { generateScript } from 'src/utils/generateScript'

export function Preview() {
  const { siteId } = useParams()
  const blocks = useAppSelector(selectorLayoutSiteData)
  const blocksForm = blocks.filter(
    (block) =>
      block.type === 'button' ||
      block.type === 'checkbox' ||
      block.type === 'input' ||
      block.type === 'radiobox' ||
      block.type === 'select' ||
      block.type === 'textarea'
  )
  const blocksBase = blocks.filter(
    (block) =>
      block.type !== 'button' &&
      block.type !== 'checkbox' &&
      block.type !== 'input' &&
      block.type !== 'radiobox' &&
      block.type !== 'select' &&
      block.type !== 'textarea'
  )
  const siteById = useAppSelector(selectSiteById(siteId ?? ''))
  const [formSubmitted, setFormSubmitted] = useState(false)

  const documentContent = `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteById?.title || 'Мой проект'}</title>
    <style>
      body {
        position: relative;
         margin:5px;
         padding: 5px;
         background-color: ${siteById?.bgColor || '#ffffff'};
             ${blocks
               ?.map((block) => `${block.styles ? generateCSSCode(block) : ''}`)
               .join('')}
    </style>
  </head>
  <body>
    ${blocksBase.map((block) => `${generateHTMLCode(block)} `).join('\n')}
    ${`<form  onsubmit="handleSubmit(event)">
      ${blocksForm.map((block) => `${generateHTMLCode(block)} `).join('\n')}
        </form> `}
        <script>
        ${generateScript()}
   </script>
  </body>
  </html>`

  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.data?.type === 'form-submission') {
        console.log('Форма отправлена:', e.data)
        setFormSubmitted(true)
        setTimeout(() => setFormSubmitted(false), 3000)
      }
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [])

  return (
    <div className="relative w-full">
      {formSubmitted && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Данные отправлены
        </div>
      )}
      <iframe
        title="Preview"
        style={{ width: '100%', height: '100%' }}
        srcDoc={documentContent}
      />
    </div>
  )
}
