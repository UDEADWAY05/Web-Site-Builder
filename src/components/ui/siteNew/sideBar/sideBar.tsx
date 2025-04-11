import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks'
import { BlockButtonProp } from '../../../../store/slices/layoutSite/types'
import {
  selectorLayoutSiteBgColor,
  selectorLayoutSiteTitle,
  selectorPreview,
} from 'src/store/slices/layoutSite/selectors'
import {
  blockBgColorUpdate,
  blockTitleUpdate,
} from 'src/store/slices/layoutSite'
import { Button } from '../../button'
import {
  setModalOpen,
  togglePreview,
} from 'src/store/slices/layoutSite/layoutSiteSlice'

export function SideBar({ blockTypes }: { blockTypes: BlockButtonProp[] }) {
  const isPreviewCode = useAppSelector(selectorPreview)
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
    <div className="p-2 w-[250px] bg-[#f4f4f4] flex flex-col">
      <div className={isPreviewCode ? 'invisible' : ''}>
        <p className="py-2 text-xs opacity-25">Название сайта</p>
        <input
          type="text"
          value={projectName}
          onChange={(e) => dispatch(blockTitleUpdate(e.target.value))}
        />
        <hr />
        <p className="py-2 text-xs opacity-25">Цвет фона страницы</p>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => dispatch(blockBgColorUpdate(e.target.value))}
        />
        <hr />
        <p className="py-2 text-xs opacity-25">Базовый</p>
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
      </div>
      <hr />

      <div className=" py-2 flex justify-between items-center">
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
  )
}
