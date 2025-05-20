import { Site } from '../siteSlice/types'

export type SiteState = {
    data: Site[] | null,
    isLoading: boolean,
    error: string | null
    isFetching: boolean
    site: Site | null
    siteFilters: SiteFilters
}

export interface SuccessResponse {
    success: true;
    data: Site[];
    lastKey: string | null;
    hasMore: boolean;
}

export interface ErrorResponse {
    success: false;
    message: string;
}

export interface SiteFilters {
    searchPhrase: string
    sort: SiteSort
    page: string | number
}

export enum SiteSort {
    asc = 'asc',
    desc = 'desc',
    oldest = 'oldest',
    newest = 'newest'
}