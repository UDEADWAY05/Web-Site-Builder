import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks'
import { BlockButtonProp } from '../../../../store/slices/layoutSite/types'
import {
  selectorLayoutSiteBgColor,
  selectorLayoutSiteTitle,
} from 'src/store/slices/layoutSite/selectors'
import {
  blockBgColorUpdate,
  blockTitleUpdate,
} from 'src/store/slices/layoutSite'

export function SideBar({ blockTypes }: { blockTypes: BlockButtonProp[] }) {
  const projectName = useAppSelector(selectorLayoutSiteTitle)
  const bgColor = useAppSelector(selectorLayoutSiteBgColor)
  const dispatch = useAppDispatch()

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    blockType: string
  ) => {
    e.dataTransfer?.setData('blockType', blockType)
  }

  return (
    <div className="px-3 py-2 w-[250px] bg-[#f4f4f4]">
      <p className="p-2 text-xs opacity-25">Название сайта</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => dispatch(blockTitleUpdate(e.target.value))}
      />
      <hr />
      <p className="p-2 text-xs opacity-25">Цвет фона страницы</p>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => dispatch(blockBgColorUpdate(e.target.value))}
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
      <p className="p-2 text-xs opacity-25">Форма</p>
    </div>
  )
}
