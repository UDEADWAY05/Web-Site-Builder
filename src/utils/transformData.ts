export function transformData(data) {
  return Object.keys(data).map((key) => ({
    ...data[key],
  }))
}
