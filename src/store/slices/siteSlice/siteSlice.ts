import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Block, Site } from './types'
 
const initialState: Site = {
  id:new Date().getTime().toString(), //TODO, it's shit
  bgColor:'#ffffff',
  title:'New_title',
  blocks:[],
  isPreview: false,
  isModalOpen: false,
}

const siteSlice = createSlice({
  name: 'layoutSite',
  initialState,
  reducers: {
    setSite: (state, action:PayloadAction<{id:string,bgColor:string,title:string}>) => {
      state.id = action.payload.id
      state.title = action.payload.title
      state.bgColor = action.payload.bgColor
    },
    setBlocks: (state, action:PayloadAction<Block[]>) => {
      state.blocks = action.payload
    },
    resetLayout: () => initialState,
    togglePreview: (state) => {
      state.isPreview = !state.isPreview
    },
    setModalOpen: (state) => {
      state.isModalOpen = true
    },
    setModalClose: (state) => {
      state.isModalOpen = false
    },
    updateSiteTitle: (state, action:PayloadAction<Site['title']>) => {
      state.title = action.payload
    },
    updateSiteBgColor: (state, action:PayloadAction<Site['bgColor']>) => {
      state.bgColor = action.payload
    },
    addBlock: (state, action:PayloadAction<Block>) => {
      state.blocks.push(action.payload)
    },
    deleteBlock: (state, action: PayloadAction<Block['id']>) => {
      state.blocks = state.blocks.filter(block => block.id !== action.payload)
    },
    updateBlockPosition: (state, action:PayloadAction<{id:string,left:number,top:number}>) => {
      const blockToUpdate = state.blocks.find(block => block.id === action.payload.id)

      if (!blockToUpdate){
        return
      }
      
      blockToUpdate.styles.left = `${action.payload.left}px`
      blockToUpdate.styles.top = `${action.payload.top}px`

      state.blocks = state.blocks.map(block => {
        return block.id === blockToUpdate.id 
          ? blockToUpdate
          : block
      })
    },
    updateBlockSize: (state, action) => {
      console.log(state, action)
    },
    updateBlockContent: (state, action:PayloadAction<{id:Block['id'],content:Block['content']}>) => {
      const blockToUpdate = state.blocks.find(block => block.id === action.payload.id)
      
      if (!blockToUpdate){
        throw new Error('Updating block not found')
      }

      blockToUpdate.content = action.payload.content

      state.blocks = state.blocks.map(block => block.id === blockToUpdate.id ? blockToUpdate : block)
    },
  },
})

export const {
  setSite,
  resetLayout,
  togglePreview,
  setModalClose,
  setModalOpen,
  setBlocks,
  updateSiteTitle,
  updateSiteBgColor,
  addBlock,
  deleteBlock,
  updateBlockPosition,
  updateBlockSize,
  updateBlockContent,
} = siteSlice.actions
 
export default siteSlice.reducer
