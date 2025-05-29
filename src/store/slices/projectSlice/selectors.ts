import { RootState } from 'src/store/store'
//комментарий
export const selectSiteById = (id: string) => (state: RootState) =>
  state.project.data?.find((site) => site.id === id)

export const selectSiteFilters = (state: RootState) => state.project.siteFilters
