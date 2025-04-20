export function calculateClickPosition(e: React.DragEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  const offsetY = e.clientY - rect.top

  return { offsetX, offsetY }
}