import { transformHeight } from "src/utils/transformHeight";
import { Block } from "src/store/slices/siteSlice";

describe('функция transformHeight', () => {
    it('возвращает "auto" при передаче числового значения', () => {
        const block: Block = {
            id: '1',
            type: 'textarea',
            position: { x: 0, y: 0 },
            dimensions: { width: 100, height: 0 },
            styles: {},
            zIndex: 1,
            content: 'Hello',
        };

        expect(transformHeight(block)).toBe('auto');
    });

    it('возвращает "auto" при передаче undefined в аргументе', () => {
        const block: Block = {
            id: '2',
            type: 'textarea',
            position: { x: 0, y: 0 },
            dimensions: { width: 100, height: undefined as any },
            styles: {},
            zIndex: 1,
            content: 'Hello',
        };

        expect(transformHeight(block)).toBe('auto');
    });

    it('возвращает значение в пикселях при вводе числового значения', () => {
        const block: Block = {
            id: '3',
            type: 'textarea',
            position: { x: 0, y: 0 },
            dimensions: { width: 100, height: 200 },
            styles: {},
            zIndex: 1,
            content: 'Hello',
        };

        expect(transformHeight(block)).toBe('200px');
    });
});
