export interface Blocks {
  id: number
  type?: string
  title: string
  bgColor: string
  width?: number
  height?: string
  styles?: object
}

export interface BlockButtonProp {
  type: string
  label: string
  defaultContent: string | string[]
  img: string
}
