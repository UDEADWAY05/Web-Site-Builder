import { RootState } from 'src/store/store'

export const selectSiteById = (id: string) => (state: RootState) =>
  state.project.data?.find((site) => site.id === id)
