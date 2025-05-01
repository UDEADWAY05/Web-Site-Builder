import { selectBlockButton } from "src/store/slices/siteSlice/selectors"
import { setSelectedBlockButton } from "src/store/slices/siteSlice/siteSlice"
import { useAppDispatch, useAppSelector } from "src/store/store"
import { BlockButtonType } from "src/store/slices/siteSlice/types"

export const BlockButton = ({ block }: { block: BlockButtonType}) => {
    const activeBlockButton = useAppSelector(selectBlockButton)
    const isSelected = activeBlockButton?.type === block.type

    const dispatch = useAppDispatch()

    return (
        <div            
            className={`col bg-slate-200 rounded-md p-1 ${isSelected ? 'bg-slate-400' : 'hover:bg-slate-300'}`}
            onClick={() => dispatch(setSelectedBlockButton(block))}
            >
            <div className="flex flex-col">
            <img className="m-auto" src={block.img} alt={block.type} />
            <div className="text-center ">
                <p className="text-xs ">{block.label}</p>
            </div>
        </div>
        </div>)
}