export interface Block {
  content?: string | number | readonly string[]
  id: number
  type: string
  layout: { title: string; bgColor: string }
  width?: number | string
  height?: number | string
  styles?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: string | number | any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y: string | number | any
}

export interface BlockButtonProp {
  type: string
  label: string
  defaultContent: string | string[]
  img: string
}
export interface LayoutSiteState {
  data: Block[] | null
  error: null
}
