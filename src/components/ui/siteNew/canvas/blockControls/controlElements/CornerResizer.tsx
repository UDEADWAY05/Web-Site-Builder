interface CornerResizerProps {
    startResize:(e: React.MouseEvent) => void
}

export const CornerResizer = ({ startResize }:CornerResizerProps) => {
    return (
        <div
            onMouseDown={startResize}
            className="absolute bottom-0 right-0 w-2 h-1 bg-black cursor-se-resize z-100"
      ></div>
    )
}