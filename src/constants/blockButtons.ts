import { button, horozontal, title, list_ol, list_ul, paragraf, photo, quote } from '../assets'
import { BlockButtonType } from 'src/store/slices/siteSlice/types'

export const blockButtons: BlockButtonType[] = [
{
    type: 'header',
    label: 'Заголовок',
    img: title,
},
{
    type: 'paragraph',
    label: 'Параграф',
    img: paragraf,
},
{
    type: 'ul',
    label: 'Маркированный',
    img: list_ul,
},
{
    type: 'ol',
    label: 'Нумерованный',
    img: list_ol,
},
{
    type: 'image',
    label: 'Изображение',
    img: photo,
},
{
    type: 'divider',
    label: 'Разделитель',
    img: horozontal,
},
{ 
    type: 'button', 
    label: 'Кнопка', 
    img: button 
},
{
    type: 'quote',
    label: 'Цитата',
    img: quote,
},
]