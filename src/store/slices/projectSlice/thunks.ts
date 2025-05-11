import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref, remove, set } from 'firebase/database'
import { ErrorResponse, SuccessResponse } from './types'

import { Site } from '../siteSlice/types'
import { RootState } from 'src/store/store'
import { setSite } from '../siteSlice'
import { db, dbSite } from 'src/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export const fetchSiteById = createAsyncThunk<
    { success: true; data: Site }, // Возвращаемое значение
    string, // Аргумент — siteId
    { rejectValue: ErrorResponse; state: RootState }
>(
    'site/fetchSiteById',
    async (siteId, { dispatch, getState, rejectWithValue }) => {
        try {
            const userId = getState().user.data?.id

            console.log(userId)
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

            console.log('FAFAF')

            const data = snapshot.val()
            console.log(data)

            dispatch(setSite(data))
            return {
                success: true,
                data: {
                    id: siteId,
                    ...data,
                },
            }
        } catch (error) {
            return rejectWithValue({
                success: false,
                message: 'Ошибка при получении сайта',
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
        console.error(error)
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
    } catch (error) {
        return rejectWithValue({
            success: false,
            message: 'Ошибка при сохранении задачи',
        })
    }
})

export const patchSite = createAsyncThunk<
    { success: true }, // Упрощенный тип возвращаемого значения
    { id: string, data: Partial<Site> },
    { state: RootState; rejectValue: ErrorResponse }
>('site/saveSite', async ({ id, data }, { getState, rejectWithValue }) => {
    try {
        const userId = getState().user.data?.id;
        if (!userId) {
            return rejectWithValue({
                success: false,
                message: 'Пользователь не авторизован',
            });
        }

        const docRef = doc(db, `sites/${userId}`, id);
        await updateDoc(docRef, data);

        return { success: true };
    } catch (error) {
        return rejectWithValue({
            success: false,
            message: error instanceof Error ? error.message : 'Неизвестная ошибка при сохранении сайта',
        });
    }
});

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
            message: 'Ошибка при удалении задачи',
        })
    }
})
