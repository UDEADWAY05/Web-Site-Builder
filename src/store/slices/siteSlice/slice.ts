import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Site, SiteState } from './types'
import { fetchSites } from './thunks';

const initialState: SiteState = {
    error: null,
    data: null,
    isLoading: false,
    lastKey: null,
    hasMore: true
};

export const SiteSlice = createSlice({
    name: 'Site',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSites.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchSites.fulfilled, (state, action) => {
                if (state.lastKey === action.payload.lastKey || action.payload.lastKey === null) {
                    state.hasMore = false
                } else {
                    state.data = state.data ? [...state.data, ...action.payload.data] : action.payload.data || []
                    state.lastKey = action.payload.lastKey
                    state.hasMore = true
                }
                state.isLoading = false

            })
            .addCase(fetchSites.rejected, (state, action) => {
                state.error = action.payload?.message || null
            })
    }
});