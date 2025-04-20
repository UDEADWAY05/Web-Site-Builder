import { describe, it, expect } from 'vitest'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'

describe('calculateClickPosition', () => {
  it('returns correct offsets from bounding rect', () => {
    const mockEvent = {
      clientX: 120,
      clientY: 160,
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 100,
          top: 150,
          width: 200,
          height: 200,
          right: 300,
          bottom: 350,
          x: 100,
          y: 150,
          toJSON: () => {},
        }),
      },
    }

    const result = calculateClickPosition(mockEvent as any)

    expect(result).toEqual({ offsetX: 20, offsetY: 10 })
  })
})