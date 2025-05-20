import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateId } from 'src/utils/generateId'
import type { Block, Site } from './types'

const initialState: Site = {
  id: generateId(),
  createdAt: new Date(),
  bgColor: '#fafafa',
  title: 'New_title',
  blocks: [],
  isPreview: false,
  isModalOpen: false,
  editingBlockId: null,
  selectedBlockButton: null,
  maxZIndex: 1,
}

const siteSlice = createSlice({
  name: 'layoutSite',
  initialState,
  reducers: {
    setSite: (
      state,
      action: PayloadAction<{
        id: string
        bgColor: string
        title: string
        blocks: Record<string, Block> | undefined
      }>
    ) => {
      state.id = action.payload.id
      state.title = action.payload.title
      state.bgColor = action.payload.bgColor
      state.blocks = action.payload.blocks
        ? (Object.values(action.payload.blocks) as Block[])
        : []
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
    updateSite: (state, action: PayloadAction<Partial<Site>>) => {
      //Очень плохое решение но времени мало, а деструктуризация action.payload перезатерает свойства Redux в state
      if (action.payload.title !== undefined) state.title = action.payload.title
      if (action.payload.bgColor !== undefined)
        state.bgColor = action.payload.bgColor
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
    updateBlockPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const blockToUpdate = state.blocks.find(
        (block) => block.id === action.payload.id
      )

      if (!blockToUpdate) {
        return
      }

      blockToUpdate.position.x = action.payload.x
      blockToUpdate.position.y = action.payload.y

      state.blocks = state.blocks.map((block) => {
        return block.id === blockToUpdate.id ? blockToUpdate : block
      })
    },
    updateBlockSize: (
      state,
      action: PayloadAction<{ id: Block['id']; width: number; height: number }>
    ) => {
      const blockToUpdate = state.blocks.find(
        (block) => block.id === action.payload.id
      )

      if (!blockToUpdate) {
        throw new Error('Updating block not found')
      }

      blockToUpdate.dimentions.width = action.payload.width
      blockToUpdate.dimentions.height = action.payload.height

      state.blocks = state.blocks.map((block) =>
        block.id === blockToUpdate.id ? blockToUpdate : block
      )
    },

    updateBlockContent: (
      state,
      action: PayloadAction<{ id: Block['id']; content: Block['content'] }>
    ) => {
      const block = state.blocks.find((block) => block.id === action.payload.id)

      if (!block) {
        return
      }

      block.content = action.payload.content
    },
    updateBlockBgColor: (
      state,
      action: PayloadAction<{ id: Block['id']; color: string }>
    ) => {
      const blockToUpdate = state.blocks.find(
        (block) => block.id === action.payload.id
      )

      if (!blockToUpdate) {
        return
      }

      blockToUpdate.styles.backgroundColor = action.payload.color
      state.blocks = state.blocks.map((block) =>
        block.id === blockToUpdate.id ? blockToUpdate : block
      )
    },

    updateBlockStyles: (
      state,
      action: PayloadAction<{ id: string; styles: Partial<Block['styles']> }>
    ) => {
      const block = state.blocks.find((block) => block.id === action.payload.id)
      if (block) {
        block.styles = { ...block.styles, ...action.payload.styles }
      }
    },
    setBlockZIndex: (
      state,
      action: PayloadAction<{ id: string; zIndex: number }>
    ) => {
      const block = state.blocks.find((b) => b.id === action.payload.id)
      if (block) {
        block.zIndex = action.payload.zIndex
      }
      if (action.payload.zIndex > state.maxZIndex) {
        state.maxZIndex = action.payload.zIndex
      }
    },
    setSelectedBlockButton: (
      state,
      action: PayloadAction<Block['type'] | null>
    ) => {
      state.selectedBlockButton = action.payload
    },
    setEditingBlockId: (state, action: PayloadAction<Block['id'] | null>) => {
      state.editingBlockId = action.payload
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
  updateBlockBgColor,
  updateBlockStyles,
  setSelectedBlockButton,
  setEditingBlockId,
  setBlockZIndex,
  updateSite,
} = siteSlice.actions

export default siteSlice.reducer
