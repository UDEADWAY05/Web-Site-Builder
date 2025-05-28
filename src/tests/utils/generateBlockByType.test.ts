import { generateBlockByType } from "src/utils/generateBlockByType"
import { Block } from 'src/store/slices/siteSlice'

describe('функция generateBlockByType', () => {
    const x = 100
    const y = 200

    const blockTypes: Array<Block['type']> = [
        'paragraph',
        'header',
        'image',
        'button',
        'ul',
        'ol',
        'divider',
        'quote',
        'input',
        'textarea',
        'select',
        'checkbox',
        'radiobox',
    ]

    test.each(blockTypes)('создает соответствующий блок с корректными данными', (type) => {
        const block = generateBlockByType(type, x, y)

        expect(block).toBeDefined()
        expect(block.type).toBe(type)
        expect(block.position).toEqual({ x, y })
        expect(block.id).toBeDefined()
        expect(typeof block.zIndex).toBe('number')
        expect(block.styles).toBeDefined()
        expect(block.dimensions).toHaveProperty('width')
        expect(block.dimensions).toHaveProperty('height')
    })

    it('выбросит ошибку на неверно указанный тип при создании', () => {
        // @ts-expect-error - обработка заранее неверное=го значения
        expect(() => generateBlockByType('unknown_type', x, y)).toThrow(
            'Unknown block type: unknown_type'
        )
    })
})
