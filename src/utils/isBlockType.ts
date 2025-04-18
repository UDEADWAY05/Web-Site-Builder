import { Block } from 'src/store/slices/siteSlice'

export function isBlockType(value: string): value is Block['type'] {
  return [
    'text',
    'paragraph',
    'image',
    'button',
    'ul',
    'ol',
    'divider',
    'checkbox',
    'radiobox',
    'input',
    'textarea',
    'select',
  ].includes(value)
}
