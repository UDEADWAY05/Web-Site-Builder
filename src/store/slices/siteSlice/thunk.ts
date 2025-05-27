import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref, remove, update } from 'firebase/database'
import { ErrorResponse } from './types'

import { Block, Site } from '../siteSlice/types'
import { RootState } from 'src/store/store'
import { dbSite } from 'src/firebase'

export const fetchSiteById = createAsyncThunk<
  { success: true; data: Site }, // Возвращаемое значение
  string, // Аргумент — siteId
  { rejectValue: ErrorResponse; state: RootState }
>(
  'site/fetchSiteById',
  async (siteId, { getState, rejectWithValue }) => {
    try {
      const userId = getState().user.data?.id
      if (!userId) {
        return rejectWithValue({
          success: false,
          message: 'Ошибка при загрузке!',
        })
      }

      const siteRef = ref(getDatabase(), `sites/${userId}/${siteId}`)
      const snapshot = await get(siteRef)

      if (!snapshot.exists()) {
        return rejectWithValue({
          success: false,
          message: 'Сайт не найден',
        })
      }
      const data = snapshot.val()
      return {
        success: true,
        data: {
          id: siteId,
          ...data,
        },
      }
    } catch (error: unknown) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error ? error.message : 'Ошибка получения сайта',
      })
    }
  }
)
export const patchSiteThunk = createAsyncThunk<
  { success: true, data: Partial<Site> }, // Упрощенный тип возвращаемого значения
  { id: string; data: Partial<Site> },
  { state: RootState; rejectValue: ErrorResponse }
>(
  'site/patchSiteThunk',
  async ({ id, data }, { getState, rejectWithValue }) => {
    const userId = getState().user.data?.id
    if (!userId) {
      return rejectWithValue({
        success: false,
        message: 'Пользователь не авторизован',
      })
    }
    const siteRef = ref(dbSite, `sites/${userId}/${id}`)
    try {
      await update(siteRef, data)

      return { success: true, data }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const addBlockThunk = createAsyncThunk<
  { success: true, data: Block }, // Упрощенный тип возвращаемого значения
  Block,
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/addBlockThunk',
  async (block, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${block.id}`]: block,
      })

      // Обновляем Redux стейт локально

      return {
        success: true,
        data: block
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const deleteBlockThunk = createAsyncThunk<
  { success: true, id: string }, // Упрощенный тип возвращаемого значения
  string,
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/deleteBlockThunk',
  async (id, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const blockRef = ref(dbSite, `sites/${userId}/${siteId}/blocks/${id}`)
    try {
      await remove(blockRef)

      return {
        success: true,
        id: id
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const updateBlockContentThunk = createAsyncThunk<
  { success: true, data: { id: string, content: Block['content'] } }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; content: Block['content'] }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockContentThunk',
  async ({ id, content }, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {

      await update(siteRef, {
        [`blocks/${id}/content`]: content,
      })

      // Обновляем Redux стейт локально

      return {
        success: true,
        data: {
          id,
          content: content
        }
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const updateBlockPositionThunk = createAsyncThunk<
  { success: true, data: { id: string, x: number, y: number } }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; x: number; y: number }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockPositionThunk',
  async ({ id, x, y }, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${id}/position`]: {
          x: x,
          y: y,
        },
      })

      return {
        success: true,
        data: {
          id,
          x,
          y
        }
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const updateBlockSizeThunk = createAsyncThunk<
  { success: true, data: { id: string; width: number, height: number } }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; width: number; height: number }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockSizeThunk',
  async ({ id, width, height }, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id  

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    } 

      
    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${id}/dimensions`]: {
          width: width - 32,
          height: height - 38,
        },
      })

      return {
        success: true,
        data: {
          width: width - 32,
          height: height - 38,
          id
        }
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const updateBlockZIndexThunk = createAsyncThunk<
  { success: true, data: { id: string, zIndex: number } }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; zIndex: number }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockZIndexThunk',
  async ({ id, zIndex }, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${id}/zIndex`]: zIndex,
      })

      return {
        success: true,
        data: {
          zIndex,
          id
        }
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const updateBlockBgColorThunk = createAsyncThunk<
  { success: true, data: { id: string, color: string } }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; color: string }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockBgColorThunk',
  async ({ id, color }, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${id}/styles`]: {
          backgroundColor: color,
        },
      })

      return {
        success: true,
        data: {
          color,
          id
        }
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)

export const updateBlockStylesThunk = createAsyncThunk<
  { success: true, data: { id: string, styles: Partial<Block['styles']> } }, // Упрощенный тип возвращаемого значения
  { id: string; styles: Partial<Block['styles']> }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockStylesThunk',
  async ({ id, styles }, { getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.data.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${id}/styles`]: styles,
      })

      return {
        success: true,
        data: {
          styles,
          id
        }
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Неизвестная ошибка при сохранении сайта',
      })
    }
  }
)
