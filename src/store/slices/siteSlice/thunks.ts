import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, limitToFirst, orderByKey, query, ref, set, startAfter } from "firebase/database";
import { ErrorResponse, FetchSitesParams, Site, SuccessResponse } from "./types";
import { db, dbSite } from "src/App";
import { deleteDoc, doc } from "firebase/firestore";

export const fetchSites = createAsyncThunk<
    SuccessResponse,
    FetchSitesParams,
    { rejectValue: ErrorResponse }
>(
    'site/FetchSites',
    async ({ limit, lastKey, userId }: FetchSitesParams, { rejectWithValue }) => {
        try {
            const dbRef = ref(getDatabase(), 'sites');

            let queryRef;

            if (lastKey) {
                queryRef = query(
                    dbRef,
                    orderByKey(),
                    startAfter(lastKey),
                    limitToFirst(limit)

                );
            } else {
                queryRef = query(
                    dbRef,
                    orderByKey(),
                    limitToFirst(limit),
                );
            }

            const snapshot = await get(queryRef);
            const sites: Site[] = [];
            let lastVisibleKey: string | null = null;

            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                if (key) {
                    lastVisibleKey = key;
                    sites.push({
                        id: key,
                        ...childSnapshot.val()
                    });
                }
            });

            return {
                success: true,
                data: sites,
                lastKey: lastVisibleKey,
                hasMore: sites.length === limit
            };
        } catch (error: unknown) {
            let errorMessage = 'Unknown error occurred';
            console.log(error)
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return rejectWithValue({
                success: false,
                message: errorMessage
            });
        }
    }
);

export const saveSite = createAsyncThunk<
    { success: true, data: Site },              // Тип возвращаемого значения
    Site,              // Тип передаваемого аргумента
    { rejectValue: ErrorResponse } // Тип ошибки
>(
    'site/saveSite',
    async (data, { rejectWithValue }) => {
        try {
            await set(ref(dbSite, `sites/${data.id}`), data)
            return {
                success: true,
                data: data
            };
        } catch (error) {
            return rejectWithValue({
                success: false,
                message: 'Ошибка при сохранении задачи'
            });
        }
    }
);

export const deleteSite = createAsyncThunk<
    { success: true, data: string },                // Тип возвращаемого значения — ID удалённой задачи
    string,                // Тип аргумента — ID задачи
    { rejectValue: ErrorResponse } // Тип ошибки
>(
    'site/deleteSite',
    async (siteId, { rejectWithValue }) => {
        try {
            const docRef = doc(db, 'sites', siteId);
            await deleteDoc(docRef);
            return {
                success: true,
                data: siteId
            };
        } catch (error) {
            return rejectWithValue({
                success: false,
                message: 'Ошибка при сохранении задачи'
            });
        }
    }
);