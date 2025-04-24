import { createSlice } from '@reduxjs/toolkit';
import { deleteSite, fetchSites, saveSite } from './thunks';
import { SiteState } from './types';

const initialState: SiteState = {
    error: null,
    data: [],        // теперь всегда массив, даже если пустой
    isLoading: false,
    isFetching: false,
};

export const ProjectsSlice = createSlice({
    name: 'Projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSites.fulfilled, (state, action) => {
                state.data = action.payload.data || [];
                state.isLoading = false;
            })
            .addCase(fetchSites.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при загрузке сайтов';
                state.isLoading = false;
            })
            .addCase(saveSite.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(saveSite.fulfilled, (state, action) => {
                const updatedSite = action.payload.data;
                if (state.data !== null) {
                    const index = state.data.findIndex(site => site.id === updatedSite.id);
                    if (index !== -1) {
                        state.data[index] = updatedSite;
                    } else {
                        state.data.push(updatedSite);
                    }
                }
                state.isFetching = false;
            })
            .addCase(saveSite.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при сохранении сайта';
                state.isFetching = false;
            })
            .addCase(deleteSite.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(deleteSite.fulfilled, (state, action) => {
                if (state.data !== null) {
                    state.data = state.data.filter(site => site.id !== action.payload.data);
                }
                state.isFetching = false;
            })
            .addCase(deleteSite.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при удалении сайта';
                state.isFetching = false;
            })
    },
});
