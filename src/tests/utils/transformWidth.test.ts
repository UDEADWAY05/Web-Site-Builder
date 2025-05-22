import { transformWidth } from "src/utils/transformWidth";
import { Block } from 'src/store/slices/siteSlice';

describe('функция transformWidth', () => {
  it('возвращает "100%" для блока divider', () => {
    const block: Block = {
      id: '1',
      type: 'divider',
      position: { x: 0, y: 0 },
      dimentions: { width: 0, height: 0 },
      styles: {},
      zIndex: 1,
      content: '',
    };

    expect(transformWidth(block)).toBe('100%');
  });

  it('возврщает "auto" при занании значения 0', () => {
    const block: Block = {
      id: '2',
      type: 'textarea',
      position: { x: 0, y: 0 },
      dimentions: { width: 0, height: 100 },
      styles: {},
      zIndex: 1,
      content: 'Text content',
    };

    expect(transformWidth(block)).toBe('auto');
  });

  it('возвращает "auto" при значении ширины undefined', () => {
    const block: Block = {
      id: '3',
      type: 'textarea',
      position: { x: 0, y: 0 },
      dimentions: { width: undefined as any, height: 100 },
      styles: {},
      zIndex: 1,
      content: 'Text content',
    };

    expect(transformWidth(block)).toBe('auto');
  });

  it('возвращает корректное значение в строке+пиксели при задании в числовом значении', () => {
    const block: Block = {
      id: '4',
      type: 'textarea',
      position: { x: 0, y: 0 },
      dimentions: { width: 150, height: 100 },
      styles: {},
      zIndex: 1,
      content: 'Text content',
    };

    expect(transformWidth(block)).toBe('150px');
  });
});
