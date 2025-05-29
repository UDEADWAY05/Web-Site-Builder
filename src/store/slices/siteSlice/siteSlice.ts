import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Block, Site, SiteSlice } from './types'
import { addBlockThunk, deleteBlockThunk, fetchSiteById, patchSiteThunk, updateBlockBgColorThunk, updateBlockContentThunk, updateBlockPositionThunk, updateBlockSizeThunk, updateBlockStylesThunk, updateBlockZIndexThunk } from './thunk'

const initialState: SiteSlice = {
  data: {
    id: "",
    title: "",
    bgColor: "#fafafa",
    blocks: [],
    createdAt: "",
    formScript: ''
  },
  error: null,
  isLoading: false,
  isFetching: false,
  editingBlockId: null,
  selectedBlockButton: null,
  isModalOpen: false,
  isPreview: false,
  maxZIndex: 1,
}

const siteSlice = createSlice({
  name: 'layoutSite',
  initialState,
  reducers: {
    setSite: (
      state,
      action: PayloadAction<Site>
    ) => {
      state.data = {
        ...action.payload,
        blocks: action.payload.blocks
          ? (Object.values(action.payload.blocks) as Block[])
          : []
      }
    },
    setBlocks: (state, action: PayloadAction<Block[]>) => {
      state.data.blocks = action.payload
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
      state.data = {
        ...state.data,
        ...action.payload
      }
    },
    addBlock: (state, action: PayloadAction<Block>) => {
      state.data?.blocks?.push(action.payload)
    },
    deleteBlock: (state, action: PayloadAction<Block['id']>) => {
      state.data.blocks = state.data.blocks?.filter((block) => block.id !== action.payload)
    },
    updateBlockPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const blockToUpdate = state.data.blocks?.find(
        (block) => block.id === action.payload.id
      )

      if (!blockToUpdate) {
        return
      }

      blockToUpdate.position.x = action.payload.x
      blockToUpdate.position.y = action.payload.y

      state.data.blocks = state.data.blocks?.map((block) => {
        return block.id === blockToUpdate.id ? blockToUpdate : block
      })
    },
    updateBlockSize: (
      state,
      action: PayloadAction<{ id: Block['id']; width: number; height: number }>
    ) => {
      const blockToUpdate = state.data.blocks?.find(
        (block) => block.id === action.payload.id
      )

      if (!blockToUpdate) {
        throw new Error('Updating block not found')
      }

      blockToUpdate.dimensions.width = action.payload.width
      blockToUpdate.dimensions.height = action.payload.height

      state.data.blocks = state.data.blocks?.map((block) =>
        block.id === blockToUpdate.id ? blockToUpdate : block
      )
    },

    updateBlockContent: (
      state,
      action: PayloadAction<{ id: Block['id']; content: Block['content'] }>
    ) => {
      const block = state.data.blocks?.find((block) => block.id === action.payload.id)

      if (!block) {
        return
      }

      block.content = action.payload.content
    },

    updateBlockName: (
      state,
      action: PayloadAction<{ id: Block['id']; name: string }>
    ) => {
      const block = state.data.blocks?.find((block) => block.id === action.payload.id)

      if (!block) {
        return
      }

      if (block.type === 'input'
        || block.type === 'checkbox'
        || block.type === 'textarea'
        || block.type === 'radiobox'
        || block.type === 'select'
      ) {
        block.name = action.payload.name
      }
    },
    updateBlockBgColor: (
      state,
      action: PayloadAction<{ id: Block['id']; color: string }>
    ) => {
      const blockToUpdate = state.data.blocks?.find(
        (block) => block.id === action.payload.id
      )

      if (!blockToUpdate) {
        return
      }

      blockToUpdate.styles.backgroundColor = action.payload.color
      state.data.blocks = state.data.blocks?.map((block) =>
        block.id === blockToUpdate.id ? blockToUpdate : block
      )
    },

    updateBlockStyles: (
      state,
      action: PayloadAction<{ id: string; styles: Partial<Block['styles']> }>
    ) => {
      const block = state.data.blocks?.find((block) => block.id === action.payload.id)
      if (block) {
        block.styles = { ...block.styles, ...action.payload.styles }
      }
    },
    setBlockZIndex: (
      state,
      action: PayloadAction<{ id: string; zIndex: number }>
    ) => {
      const block = state.data.blocks?.find((b) => b.id === action.payload.id)
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteById.pending, (state) => {
        state.isFetching = true
        state.isLoading = true
      })
      .addCase(fetchSiteById.fulfilled, (state, action) => {
        state.data = {
          ...action.payload.data,
          blocks: action.payload.data.blocks
            ? (Object.values(action.payload.data.blocks) as Block[])
            : []
        }
        state.isLoading = false
        state.isFetching = false
        state.error = null
      })
      .addCase(fetchSiteById.rejected, (state, action) => {
        state.isLoading = false
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при получении данных!'
      })
      .addCase(patchSiteThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(patchSiteThunk.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload.data
        }
        state.isFetching = false
        state.error = null
      })
      .addCase(patchSiteThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })
      .addCase(addBlockThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(addBlockThunk.fulfilled, (state, action) => {
        state.data.blocks?.push(action.payload.data)
        state.isFetching = false
        state.error = null
      })
      .addCase(addBlockThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })
      .addCase(deleteBlockThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(deleteBlockThunk.fulfilled, (state, action) => {
        state.data.blocks = state.data.blocks?.filter((block) => block.id !== action.payload.id)
        state.isFetching = false
        state.error = null
      })
      .addCase(deleteBlockThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })
      .addCase(updateBlockContentThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateBlockContentThunk.fulfilled, (state, action) => {
        const block = state.data.blocks?.find((block) => block.id === action.payload.data.id)
        if (block) {
          block.content = action.payload.data.content
        }
        state.isFetching = false
        state.error = null
      })
      .addCase(updateBlockContentThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })
      .addCase(updateBlockPositionThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateBlockPositionThunk.fulfilled, (state, action) => {
        const blockToUpdate = state.data.blocks?.find(
          (block) => block.id === action.payload.data.id
        )

        if (blockToUpdate) {
          blockToUpdate.position.x = action.payload.data.x
          blockToUpdate.position.y = action.payload.data.y

          state.data.blocks = state.data.blocks?.map((block) => {
            return block.id === blockToUpdate.id ? blockToUpdate : block
          })
        }

        state.isFetching = false
        state.error = null
      })
      .addCase(updateBlockPositionThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })
      .addCase(updateBlockSizeThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateBlockSizeThunk.fulfilled, (state, action) => {
        const blockToUpdate = state.data.blocks?.find(
          (block) => block.id === action.payload.data.id
        )

        if (!blockToUpdate) {
          throw new Error('Updating block not found')
        }

        blockToUpdate.dimensions.width = action.payload.data.width
        blockToUpdate.dimensions.height = action.payload.data.height

        state.data.blocks = state.data.blocks?.map((block) =>
          block.id === blockToUpdate.id ? blockToUpdate : block
        )
        state.isFetching = false
        state.error = null
      })
      .addCase(updateBlockSizeThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })

      .addCase(updateBlockZIndexThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateBlockZIndexThunk.fulfilled, (state, action) => {
        const block = state.data.blocks?.find((b) => b.id === action.payload.data.id)
        if (block) {
          block.zIndex = action.payload.data.zIndex
        }
        if (action.payload.data.zIndex > state.maxZIndex) {
          state.maxZIndex = action.payload.data.zIndex
        }
        state.isFetching = false
        state.error = null
      })
      .addCase(updateBlockZIndexThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })
      .addCase(updateBlockBgColorThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateBlockBgColorThunk.fulfilled, (state, action) => {
        const blockToUpdate = state.data.blocks?.find(
          (block) => block.id === action.payload.data.id
        )
        if (!blockToUpdate) {
          return
        }
        blockToUpdate.styles.backgroundColor = action.payload.data.color
        state.data.blocks = state.data.blocks?.map((block) =>
          block.id === blockToUpdate.id ? blockToUpdate : block
        )
        state.isFetching = false
        state.error = null
      })
      .addCase(updateBlockBgColorThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })

      .addCase(updateBlockStylesThunk.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateBlockStylesThunk.fulfilled, (state, action) => {
        const block = state.data.blocks?.find((block) => block.id === action.payload.data.id)
        if (block) {
          block.styles = { ...block.styles, ...action.payload.data.styles }
        }
        state.isFetching = false
        state.error = null
      })
      .addCase(updateBlockStylesThunk.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload?.message || 'Ошибка при изменении!'
      })
  }
})

export const {
  setSite,
  resetLayout,
  setModalClose,
  setModalOpen,
  togglePreview,
  setBlocks,
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
