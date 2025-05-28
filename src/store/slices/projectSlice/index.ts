import { ProjectsSlice } from './slice'
export const projectReducer = ProjectsSlice.reducer

export { saveSite, deleteSite, fetchSites } from "./thunks"