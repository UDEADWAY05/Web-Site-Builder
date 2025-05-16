export function transformData(data: Record<string,object>) {
  return Object.keys(data).map((key) => ({
    ...data[key],
  }))
}
