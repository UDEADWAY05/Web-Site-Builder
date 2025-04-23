import { useAppDispatch, useAppSelector } from 'src/store/store'
import { Button } from '../../button'
import {
    setModalOpen,
    togglePreview,
} from 'src/store/slices/siteSlice'
import { selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { selectSiteTitle, selectSiteBgColor } from 'src/store/slices/siteSlice/selectors'
import { updateSiteTitle, updateSiteBgColor } from 'src/store/slices/siteSlice'
import { BlockButton } from '../../../../store/slices/siteSlice/types'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'

export function SideBar({ blockTypes }: { blockTypes: BlockButton[] }) {
    const projectName = useAppSelector(selectSiteTitle)
    const bgColor = useAppSelector(selectSiteBgColor)
    const isPreviewCode = useAppSelector(selectorPreview)

    const dispatch = useAppDispatch()

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, blockType: BlockButton['type']) => {
        e.dataTransfer.setData('blockType', blockType)
    }

    return (
        <>
            <div className="px-3 py-2 w-[250px] bg-[#f4f4f4]">
                <p className="p-2 text-xs opacity-25">Название сайта</p>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => dispatch(updateSiteTitle(e.target.value))}
                />
                <hr />
                <p className="p-2 text-xs opacity-25">Цвет фона страницы</p>
                <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => dispatch(updateSiteBgColor(e.target.value))}
                />
                <hr />
                <p className="p-2 text-xs opacity-25">Базовый</p>
                <div className="grid grid-cols-2 gap-1">
                    {blockTypes.map((block) => (
                        <div
                            draggable
                            key={block.type}
                            className="col border-2 border-black rounded-md p-1"
                            style={{ cursor: 'pointer' }}
                            onDragStart={(e) => handleDragStart(e, block.type)}
                        >
                            <div className="flex flex-col">
                                <img className="m-auto" src={block.img} alt={block.type} />

                                <div className="text-center ">
                                    <p className=" text-xs ">{block.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <p className="py-2 text-xs opacity-25">Форма</p>
                <div className="py-2 flex justify-between items-center">
                    {
                        <>
                            <Button className="px-1" onClick={() => dispatch(togglePreview())}>
                                {isPreviewCode ? 'Редактировать' : 'Предпросмотр'}
                            </Button>
                            <Button className="px-1" onClick={() => dispatch(setModalOpen())}>
                                Посмотреть код
                            </Button>
                        </>
                    }
                </div>
            </div>
            <hr />
        </>
    )
}
