interface CornerResizerProps {
    startResize:(e: React.MouseEvent) => void
}

export const CornerResizer = ({ startResize }: CornerResizerProps) => {
    return (
      <span
        onMouseDown={startResize}
        className="absolute bottom-0 right-0 w-2 h-1 bg-black cursor-se-resize z-50 rounded-br-sm"
        // style={{ transform: 'translate(50%, 50%)' }}
      />
    )
}