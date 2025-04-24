import { ProjectsSlice } from './slice'
export const projectReducer = ProjectsSlice.reducer

export { saveSite, deleteSite, fetchSites, fetchSiteById } from "./thunks"