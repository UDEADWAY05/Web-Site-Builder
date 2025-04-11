import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { saveSite } from 'src/App'
import type { Block, Site } from './types'
 
const initialState: Site = {
  id:new Date().getTime().toString(), //TODO, it's shit
  bgColor:'#fff',
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
      console.log(action.payload)
      state.title = action.payload
      // if (state.entities) {
      //   state.entities.title = action.payload
      //   console.log(state.entities.title)
      //   saveSite(state.entities?.id, state.entities)
      // }
    },
    updateSiteBgColor: (state, action:PayloadAction<Site['bgColor']>) => {
      console.log(action.payload)
      state.bgColor = action.payload
      // if (state.entities) {
        
      //   state.entities.bgColor = action.payload
      //   console.log(state.entities.bgColor)
      //   saveSite(state.entities?.id, state.entities)
      // }
    },
    addBlock: (state, action:PayloadAction<Block>) => {
      state.blocks.push(action.payload)
      // if (state.entities) {
      //   if (!Array.isArray(state.entities.data)) {
      //     state.entities.data = []
      //   }
      //   state.entities.data.push(action.payload)

      //   saveSite(state.entities?.id, state.entities)
      // }
    },
    deleteBlock: (state, action: PayloadAction<Block['id']>) => {
      state.blocks = state.blocks.filter(block => block.id !== action.payload)
      // if (state.entities) {
      //   state.entities.data = state.entities.data.filter(
      //     (block) => block.id !== action.payload
      //   )
      //   saveSite(state.entities?.id, state.entities)
      // }
    },
    updateBlockPosition: (state, action:PayloadAction<{id:string,left:number,top:number}>) => {
      const blockToUpdate = state.blocks.find(block => block.id === action.payload.id)

      if (!blockToUpdate){
        return
      }
      
      blockToUpdate.styles.left = action.payload.left
      blockToUpdate.styles.top = action.payload.top

      state.blocks = state.blocks.map(block => {
        return block.id === blockToUpdate.id 
          ? blockToUpdate
          : block
      })

      console.log(state.blocks)
      // if (state.entities) {
      //   state.entities.data = state.entities.data
      //     .map((block) =>
      //       block.id === action.payload.id
      //         ? {
      //             ...block,
      //             styles: {
      //               ...block.styles,
      //               left: action.payload.newX,
      //               top: action.payload.newY,
      //             },
      //           }
      //         : block
      //     )
      //     .filter(
      //       (block) =>
      //         block.styles?.left >= 0 &&
      //         block.styles?.top >= 0 &&
      //         block.styles?.left < 800 && //максимальная ширина рабочей области
      //         block.styles?.top < 600 //максимальная высота рабочей области
      //     )
      //   saveSite(state.entities?.id, state.entities)
      // }
    },
    updateBlockSize: (state, action) => {
      console.log(state, action)
    },
    updateBlockContent: (state, action:PayloadAction<{id:Block['id'],content:Block['content']}>) => {
      console.log(action.payload.id,action.payload.content)
      // if (state.entities) {
      //   state.entities.data = state.entities.data.map((block) => {
      //     if (block.id === action.payload.id) {
      //       return {
      //         ...block,
      //         content: action.payload.newContent,
      //       }
      //     }
      //     if (block.type === 'paragraph' || block.type === 'quote') {
      //       return {
      //         ...block.styles,
      //         fontWeight: 'bold',
      //         fontStyle: 'italic',
      //       }
      //     }
      //     return block
      //   })
      //   saveSite(state.entities?.id, state.entities)
      // }
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
