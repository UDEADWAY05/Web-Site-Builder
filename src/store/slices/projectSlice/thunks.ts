import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref, remove, set, update } from 'firebase/database'
import { ErrorResponse, SuccessResponse } from './types'

import { Block, Site } from '../siteSlice/types'
import { RootState } from 'src/store/store'
import { setSite } from '../siteSlice'
import { dbSite } from 'src/firebase'
import {
  addBlock,
  deleteBlock,
  updateBlockBgColor,
  updateBlockContent,
  updateBlockPosition,
  updateBlockSize,
  updateBlockStyles,
  updateSite,
} from '../siteSlice/siteSlice'

export const fetchSiteById = createAsyncThunk<
  { success: true; data: Site }, // Возвращаемое значение
  string, // Аргумент — siteId
  { rejectValue: ErrorResponse; state: RootState }
>(
  'site/fetchSiteById',
  async (siteId, { dispatch, getState, rejectWithValue }) => {
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
      dispatch(setSite(data))
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

export const fetchSites = createAsyncThunk<
  SuccessResponse,
  undefined,
  { state: RootState; rejectValue: ErrorResponse }
>('site/FetchSites', async (_, { getState, rejectWithValue }) => {
  try {
    const userId = getState().user.data?.id
    if (!userId) {
      return rejectWithValue({
        success: false,
        message: 'Ошибка при загрузке!',
      })
    }

    const userSitesRef = ref(getDatabase(), `sites/${userId}`)
    const snapshot = await get(userSitesRef)

    // const userId2 = getState().user.data.id

    const sites: Site[] = []
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key
      if (key) {
        sites.push({
          id: key,
          ...childSnapshot.val(),
        })
      }
    })

    return {
      success: true,
      data: sites,
      lastKey: null,
      hasMore: false,
    }
  } catch (error: unknown) {
    return rejectWithValue({
      success: false,
      message: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
  }
})

export const saveSite = createAsyncThunk<
  { success: true; data: Site }, // Тип возвращаемого значения
  Site, // Тип передаваемого аргумента
  { state: RootState; rejectValue: ErrorResponse } // Тип ошибки
>('site/saveSite', async (data, { getState, rejectWithValue }) => {
  try {
    const userId = getState().user.data?.id
    if (!userId) {
      return rejectWithValue({
        success: false,
        message: 'Ошибка при сохранении задачи',
      })
    }
    await set(ref(dbSite, `sites/${userId}/${data.id}`), data)
    return {
      success: true,
      data: data,
    }
  } catch (error: unknown) {
    return rejectWithValue({
      success: false,
      message:
        error instanceof Error ? error.message : 'Ошибка при сохранении задачи',
    })
  }
})

export const patchSiteThunk = createAsyncThunk<
  { success: true }, // Упрощенный тип возвращаемого значения
  { id: string; data: Partial<Site> },
  { state: RootState; rejectValue: ErrorResponse }
>(
  'site/patchSiteThunk',
  async ({ id, data }, { getState, rejectWithValue, dispatch }) => {
    const userId = getState().user.data?.id
    if (!userId) {
      return rejectWithValue({
        success: false,
        message: 'Пользователь не авторизован',
      })
    }
    const siteRef = ref(dbSite, `sites/${userId}/${id}`)
    try {
      dispatch(updateSite(data))

      await update(siteRef, data)

      return { success: true }
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
  { success: true }, // Упрощенный тип возвращаемого значения
  Block,
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/addBlockThunk',
  async (block, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.id

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
      dispatch(addBlock(block))

      return {
        success: true,
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
  { success: true }, // Упрощенный тип возвращаемого значения
  string,
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/deleteBlockThunk',
  async (id, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const blockRef = ref(dbSite, `sites/${userId}/${siteId}/blocks/${id}`)
    try {
      await remove(blockRef)
      // Обновляем Redux стейт локально
      dispatch(deleteBlock(id))

      return {
        success: true,
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
  { success: true }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; content: Block['content'] }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockContentThunk',
  async ({ id, content }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.id

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
      dispatch(updateBlockContent({ id: id, content }))

      return {
        success: true,
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
  { success: true }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; x: number; y: number }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockPositionThunk',
  async ({ id, x, y }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.id

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

      // Обновляем Redux стейт локально
      dispatch(updateBlockPosition({ id, x, y }))

      return {
        success: true,
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
  { success: true }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; width: number; height: number }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockSizeThunk',
  async ({ id, width, height }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${id}/dimentions`]: {
          width: width,
          height: height,
        },
      })

      // Обновляем Redux стейт локально
      dispatch(updateBlockSize({ id, width, height }))

      return {
        success: true,
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
  { success: true }, // Упрощенный тип возвращаемого значения // что возвращает
  { id: string; color: string }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockBgColorThunk',
  async ({ id, color }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.id

    if (!userId || !siteId) {
      return rejectWithValue({
        success: false,
        message: 'Missing user or site ID',
      })
    }

    const siteRef = ref(dbSite, `sites/${userId}/${siteId}`)
    try {
      await update(siteRef, {
        [`blocks/${id}`]: {
          bgColor: color,
        },
      })

      // Обновляем Redux стейт локально
      dispatch(updateBlockBgColor({ id, color }))

      return {
        success: true,
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
  { success: true }, // Упрощенный тип возвращаемого значения
  { id: string; styles: Partial<Block['styles']> }, // аргументы
  { state: RootState; rejectValue: ErrorResponse } // доступ к стейту
>(
  'site/updateBlockStylesThunk',
  async ({ id, styles }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const userId = state.user.data?.id
    const siteId = state.site.id

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

      // Обновляем Redux стейт локально
      dispatch(updateBlockStyles({ id, styles }))
      return {
        success: true,
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

export const deleteSite = createAsyncThunk<
  { success: true; data: string }, // Тип возвращаемого значения — ID удалённой задачи
  string, // Тип аргумента — ID задачи
  { state: RootState; rejectValue: ErrorResponse } // Тип ошибки
>('site/deleteSite', async (siteId, { getState, rejectWithValue }) => {
  try {
    const userId = getState().user.data?.id
    if (!userId) {
      return rejectWithValue({
        success: false,
        message: 'Ошибка при удалении задачи',
      })
    }
    const docRef = ref(getDatabase(), `sites/${userId}/${siteId}`)
    await remove(docRef)
    return {
      success: true,
      data: siteId,
    }
  } catch (error) {
    return rejectWithValue({
      success: false,
      message:
        error instanceof Error ? error.message : 'Ошибка при удалении задачи',
    })
  }
})
