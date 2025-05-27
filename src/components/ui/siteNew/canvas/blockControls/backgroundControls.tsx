import { Block } from "src/store/slices/siteSlice"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"
import { useAppDispatch } from "src/store/store"
import { updateBlockStylesThunk } from 'src/store/slices/siteSlice/thunk'

interface Props {
    block: Block
}

export const BackGroundControls = ({ block }: Props) => {
    const dispatch = useAppDispatch()

    const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateBlockStylesThunk({
                id: block.id,
                styles: { ...block.styles, backgroundColor: e.target.value },
            })
        )
    }

    return <div>
        <BackgroundColorButton
            value={block?.styles.backgroundColor ?? ''}
            onChange={handleBackgroundColorChange}
        />
    </div>
}
