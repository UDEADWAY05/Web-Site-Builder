import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Block, BlockButtonType, HeaderBlockType, ImageBlockType, Site } from './types'

const initialState: Site = {
  id: new Date().getTime().toString(), //TODO, it's shit
  bgColor: '#fafafa',
  title: 'New_title',
  blocks: [],
  selectedBlockButton: null,
  selectedBlockId:'',
  isPreview: false,
  isModalOpen: false,
  selectedBlock: null
}

const siteSlice = createSlice({
  name: 'layoutSite',
  initialState,
  reducers: {
    setSite: (
      state,
      action: PayloadAction<{ id: string; bgColor: string; title: string }>
    ) => {
      state.id = action.payload.id
      state.title = action.payload.title
      state.bgColor = action.payload.bgColor
    },
    setBlocks: (state, action: PayloadAction<Block[]>) => {
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
    updateSiteTitle: (state, action: PayloadAction<Site['title']>) => {
      state.title = action.payload
    },
    updateSiteBgColor: (state, action: PayloadAction<Site['bgColor']>) => {
      state.bgColor = action.payload
    },
    addBlock: (state, action: PayloadAction<Block>) => {
      state.blocks.push(action.payload)
    },
    deleteBlock: (state, action: PayloadAction<Block['id']>) => {
      state.blocks = state.blocks.filter((block) => block.id !== action.payload)
    },
    updateBlockPosition: (state, action:PayloadAction<{id:string,left:number,top:number}>) => {
      // console.log(action.payload)
      const blockToUpdate = state.blocks.find(block => block.id === action.payload.id)

      if (!blockToUpdate) {
        return
      }
      
      // blockToUpdate.styles.left = `${action.payload.left}px`
      // blockToUpdate.styles.top = `${action.payload.top}px`
      blockToUpdate.styles.left = action.payload.left
      blockToUpdate.styles.top = action.payload.top

      state.blocks = state.blocks.map((block) => {
        return block.id === blockToUpdate.id ? blockToUpdate : block
      })
    },
    updateBlockSize: (state, action:PayloadAction<{id:Block['id'],width:number,height:number}>) => {
      console.log(state, action)
      const blockToUpdate = state.blocks.find(block => block.id === action.payload.id)

      if (!blockToUpdate){
        throw new Error('Updating block not found')
      }

      blockToUpdate.styles.width = action.payload.width
      blockToUpdate.styles.height = action.payload.height

      state.blocks = state.blocks.map(block => block.id === blockToUpdate.id ? blockToUpdate : block)
    },
    updateBlockContent: (
      state,
      action: PayloadAction<{
        id: Block['id']
        content:
          | string // paragraph
          | { text: string; level: number } // header
          | { url: string; alt?: string } // image
          | string[] //list[]
      }>
    ) => {
      const blockToUpdate = state.blocks.find(
        (block) => block.id === action.payload.id
      )

      if (!blockToUpdate) {
        throw new Error('Updating block not found')
      }

      if (
        typeof action.payload.content === 'object' &&
        action.payload.content !== null
      ) {
        if (blockToUpdate.type === 'header') {
          const headerBlock = blockToUpdate as HeaderBlockType
          headerBlock.content.text = action.payload.content.text
          headerBlock.content.level = action.payload.content.level
        }
        if (blockToUpdate.type === 'image') {
          const headerBlock = blockToUpdate as ImageBlockType
          headerBlock.content.url = action.payload.content.url
          headerBlock.content.alt = action.payload.content.alt
        }
      }

      if (
        Array.isArray(blockToUpdate.content) &&
        Array.isArray(action.payload.content)
      ) {
        blockToUpdate.content = [...action.payload.content]
      }

      state.blocks = state.blocks.map((block) =>
        block.id === blockToUpdate.id ? blockToUpdate : block
      )
    },
    updateBlockBgColor: (state, action:PayloadAction<{id:Block['id'],color: Block['styles']['backgroundColor']}>) => {
      const blockToUpdate = state.blocks.find(block => block.id === action.payload.id)

      if (!blockToUpdate){
        throw new Error('Updating block not found')
      }

      blockToUpdate.styles.backgroundColor = action.payload.color
      state.blocks = state.blocks.map(block => block.id === blockToUpdate.id ? blockToUpdate : block)
    },
    updateBlockStyles: (state, action: PayloadAction<{ id: string; styles: React.CSSProperties }>) => {
      const block = state.blocks.find((b) => b.id === action.payload.id)
      if (block) {
        block.styles = {
          ...block.styles,
          ...action.payload.styles,
        }
      }
    },
    setSelectedBlockButton:(state,action:PayloadAction<BlockButtonType>) => {
      state.selectedBlockButton = action.payload
    },
    clearSelectedBlockButton:(state) => {
      state.selectedBlockButton = null
    },
    setSelectedBlockId: (state,action:PayloadAction<Block['id']>) => {
      state.selectedBlockId = action.payload
    },
    clearSelectedBlockId: (state) => {
      state.selectedBlockId = ''
    },
    setSelectedBlock: (state,action:PayloadAction<Block>) => {
      state.selectedBlock = action.payload
    },
    clearSelectedBlock:(state) => {
      state.selectedBlock = null
    }
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
  updateBlockBgColor,
  updateBlockStyles,
  setSelectedBlockButton,
  clearSelectedBlockButton,
  setSelectedBlockId,
  clearSelectedBlockId,
  setSelectedBlock,
  clearSelectedBlock
} = siteSlice.actions

export default siteSlice.reducer
