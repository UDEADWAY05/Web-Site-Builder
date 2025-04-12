export type Site = {
    id: string,
    title: string,
    userId: string,
    content: []
}

export type SiteState = {
    data: Site[] | null,
    isLoading: boolean,
    hasMore: boolean,
    lastKey: string | null,
    error: string | null
}

export interface FetchSitesParams {
    limit: number;
    lastKey?: string | null;
    userId: string
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