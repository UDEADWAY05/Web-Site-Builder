import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Block, LayoutSiteState } from './types'
import { ref, set } from 'firebase/database'
import { dbSite, saveSite } from 'src/App'

const initialState: LayoutSiteState = {
  entities: null,
}

const layoutSite = createSlice({
  name: 'layoutSite',
  initialState,
  reducers: {
    setSite: (state, action) => {
      state.entities = action.payload
    },
    blockTitleUpdate: (state, action) => {
      if (state.entities) {
        state.entities.title = action.payload
        saveSite(state.entities?.id, state.entities)
      }
    },
    blockBgColorUpdate: (state, action) => {
      if (state.entities) {
        state.entities.bgColor = action.payload
        saveSite(state.entities?.id, state.entities)
      }
    },
    blockCreate: (state, action) => {
      if (state.entities) {
        if (!Array.isArray(state.entities.data)) {
          state.entities.data = []
        }
        state.entities.data.push(action.payload)

        saveSite(state.entities?.id, state.entities)
      }
    },
    blockDelete: (state, action: PayloadAction<Block['id']>) => {
      if (state.entities) {
        state.entities.data = state.entities.data.filter(
          (block) => block.id !== action.payload
        )
        saveSite(state.entities?.id, state.entities)
      }
    },
    blockPositionUpdate: (state, action) => {
      if (state.entities) {
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
        saveSite(state.entities?.id, state.entities)
      }
    },
    blockSizeUpdate: (state, action) => {
      console.log(state, action)
    },
    blockContentUpdate: (state, action) => {
      if (state.entities) {
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
        saveSite(state.entities?.id, state.entities)
      }
    },
  },
})

export const {
  setSite,
  blockTitleUpdate,
  blockBgColorUpdate,
  blockCreate,
  blockDelete,
  blockPositionUpdate,
  blockSizeUpdate,
  blockContentUpdate,
} = layoutSite.actions

export default layoutSite.reducer
