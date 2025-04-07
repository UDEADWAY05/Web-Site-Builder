export interface Block {
  content: string | number
  id: number
  type: string
  title: string
  bgColor: string
  styles?: {
    width?: number | string
    height?: number | string
    left: string | number
    top: string | number
  }
}

export interface BlockButtonProp {
  type: string
  label: string
  defaultContent: string | string[]
  img: string
}
export interface LayoutSiteState {
  entities: Site | null
}

export interface Site {
  id: string
  title: string
  bgColor: string
  data: Block[] | []
}
