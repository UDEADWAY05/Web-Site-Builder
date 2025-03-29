export interface Blocks {
  content: string | number | readonly string[] | undefined
  id: number
  type: string
  title?: string
  bgColor: string
  width?: number
  height?: string
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
