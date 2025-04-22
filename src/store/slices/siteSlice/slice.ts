import { createSlice } from '@reduxjs/toolkit';
import { SiteState } from './types'
import { deleteSite, fetchSites, saveSite } from './thunks';

const initialState: SiteState = {
    error: null,
    data: null,
    isLoading: false,
    isFetching: false,
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
            .addCase(saveSite.pending, (state) => {
                state.isFetching = true
            })
            .addCase(saveSite.fulfilled, (state) => {
                state.isFetching = false
            })
            .addCase(saveSite.rejected, (state, action) => {
                state.error = action.payload?.message || null
                state.isFetching = false
            })
            .addCase(deleteSite.pending, (state) => {
                state.isFetching = true
            })
            .addCase(deleteSite.fulfilled, (state) => {
                state.isFetching = false
            })
            .addCase(deleteSite.rejected, (state, action) => {
                state.error = action.payload?.message || null
                state.isFetching = false
            })
    }
});