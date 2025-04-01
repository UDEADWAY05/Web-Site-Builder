import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Block, LayoutSiteState } from './types'

const initialState: LayoutSiteState = {
  entities: {
    id: Date.now(),
    title: 'My Project',
    bgColor: '#5C90FF',
    data: [],
  },
  error: null,
}

const layoutSite = createSlice({
  name: 'layoutSite',
  initialState,
  reducers: {
    blockTitleUpdate: (state, action) => {
      state.entities.title = action.payload
    },
    blockBgColorUpdate: (state, action) => {
      state.entities.bgColor = action.payload
    },
    blockCreate: (state, action) => {
      if (!Array.isArray(state.entities.data)) {
        state.entities.data = []
      }
      state.entities.data.push(action.payload)
    },
    blockDelete: (state, action: PayloadAction<Block['id']>) => {
      state.entities.data = state.entities.data.filter(
        (block) => block.id !== action.payload
      )
    },
    blockPositionUpdate: (state, action) => {
      state.entities.data = state.entities.data
        .map((block) =>
          block.id === action.payload.id
            ? {
                ...block,
                styles: {
                  ...block.styles,
                  left: action.payload.newX,
                  top: action.payload.newY,
                },
              }
            : block
        )
        .filter(
          (block) =>
            block.styles?.left >= 0 &&
            block.styles?.top >= 0 &&
            block.styles?.left < 800 && //максимальная ширина рабочей области
            block.styles?.top < 600 //максимальная высота рабочей области
        )
    },
    blockSizeUpdate: (state, action) => {
      console.log(state, action)
    },
    blockContentUpdate: (state, action) => {
      console.log(action.payload)

      state.entities.data = state.entities.data.map((block) => {
        if (block.id === action.payload.id) {
          return {
            ...block,
            content: action.payload.newContent,
          }
        }
        if (block.type === 'paragraph' || block.type === 'quote') {
          return {
            ...block.styles,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }
        }
        return block
      })
    },
  },
})

export const {
  blockTitleUpdate,
  blockBgColorUpdate,
  blockCreate,
  blockDelete,
  blockPositionUpdate,
  blockSizeUpdate,
  blockContentUpdate,
} = layoutSite.actions

export default layoutSite.reducer
