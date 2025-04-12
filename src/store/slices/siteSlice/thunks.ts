import { createAsyncThunk } from "@reduxjs/toolkit";
import { equalTo, get, getDatabase, limitToFirst, orderByKey, query, ref, startAfter } from "firebase/database";
import { ErrorResponse, FetchSitesParams, Site, SuccessResponse } from "./types";

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