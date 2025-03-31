import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Block, LayoutSiteState } from './types'

const initialState: LayoutSiteState = {
  data: null,
  error: null,
}

const layoutSite = createSlice({
  name: 'layoutSite',
  initialState,
  reducers: {
    layoutSiteCreate: (state, action) => {
      if (!Array.isArray(state.data)) {
        state.data = []
      }
      state.data.push(action.payload)
    },
    layoutSiteDelete: (state, action: PayloadAction<Block['id']>) => {
      state.data?.filter((block) => block.id !== action.payload)
    },
  },
})

export const { layoutSiteCreate, layoutSiteDelete } = layoutSite.actions

export default layoutSite.reducer
