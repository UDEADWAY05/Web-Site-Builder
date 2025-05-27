interface ZIndexButtonProps {
    zindex: number
    onChangeZIndex: (index: number) => void
}

export const ZIndexButton = ({
    zindex,
    onChangeZIndex,
}: ZIndexButtonProps) => {
    return (
        <div className="relative flex">
            <button
                onClick={() => onChangeZIndex(1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 rounded"
            >
                Min
            </button>
            <button
                onClick={() => onChangeZIndex(zindex - 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 rounded"
            >
                -
            </button>
            <button
                onClick={() => onChangeZIndex(zindex + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 rounded"
            >
                +
            </button>
            <button
                onClick={() => onChangeZIndex(20)} //Комментарий
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 rounded"
            >
                Max
            </button>
        </div>
    )
}
