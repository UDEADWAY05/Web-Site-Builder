import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addBlockThunk, deleteSite, fetchSiteById, fetchSites, patchSiteThunk, saveSite, updateBlockBgColorThunk, updateBlockContentThunk, updateBlockPositionThunk, updateBlockSizeThunk, updateBlockStylesThunk } from './thunks';
import { SiteState, SiteSort } from './types';

const initialState: SiteState = {
    error: null,
    data: [],
    isLoading: false,
    isFetching: false,
    site: null,
    siteFilters: {
        searchPhrase:'',
        page: 1,
        sort: SiteSort['asc']
    }
};

export const ProjectsSlice = createSlice({
    name: 'Projects',
    initialState,
    reducers: {
        updateSiteFilters:(state,action: PayloadAction<{ key: string, value: string }>) => {
            const { key,value } = action.payload

            state.siteFilters = {...state.siteFilters, [key]: value}
        },
        resetSiteFilters: (state) => {
            state.siteFilters = initialState.siteFilters
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSiteById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSiteById.fulfilled, (state, action) => {
                state.site = action.payload.data;
                state.isLoading = false;
                state.error = null
            })
            .addCase(fetchSiteById.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при загрузке сайтов';
                state.isLoading = false;
            })
            .addCase(fetchSites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSites.fulfilled, (state, action) => {
                state.data = action.payload.data || [];
                state.isLoading = false;
                state.error = null
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
            .addCase(patchSiteThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(patchSiteThunk.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(patchSiteThunk.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при сохранении сайта';
                state.isFetching = false;
            })
            .addCase(addBlockThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(addBlockThunk.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(addBlockThunk.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при сохранении сайта';
                state.isFetching = false;
            })
            .addCase(updateBlockBgColorThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(updateBlockBgColorThunk.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(updateBlockBgColorThunk.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при сохранении сайта';
                state.isFetching = false;
            })
            .addCase(updateBlockStylesThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(updateBlockStylesThunk.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(updateBlockStylesThunk.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при сохранении сайта';
                state.isFetching = false;
            })
            .addCase(updateBlockContentThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(updateBlockContentThunk.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(updateBlockContentThunk.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при сохранении сайта';
                state.isFetching = false;
            })
            .addCase(updateBlockPositionThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(updateBlockPositionThunk.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(updateBlockPositionThunk.rejected, (state, action) => {
                state.error = action.payload?.message || 'Ошибка при сохранении сайта';
                state.isFetching = false;
            })
            .addCase(updateBlockSizeThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(updateBlockSizeThunk.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(updateBlockSizeThunk.rejected, (state, action) => {
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

export const { updateSiteFilters, resetSiteFilters } = ProjectsSlice.actions