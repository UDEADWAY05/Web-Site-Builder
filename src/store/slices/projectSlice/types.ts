import { Site } from '../siteSlice/types'

export type SiteState = {
    data: Site[] | null,
    isLoading: boolean,
    error: string | null
    isFetching: boolean
    site: Site | null
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