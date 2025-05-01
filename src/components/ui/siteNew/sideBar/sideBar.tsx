import { useAppDispatch, useAppSelector } from 'src/store/store'
import { Button } from '../../button'
import { blockButtons } from 'src/constants/blockButtons'
import {
  setModalOpen,
  togglePreview,
  updateSiteTitle,
  updateSiteBgColor,
} from 'src/store/slices/siteSlice/siteSlice'
import { selectSiteTitle, selectSiteBgColor, selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { BlockButton } from './BlockButton'

console.log(blockButtons)

export function SideBar() {
  const projectName = useAppSelector(selectSiteTitle)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreviewCode = useAppSelector(selectorPreview)

  const dispatch = useAppDispatch()

  // const handleDragStart = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   blockType: BlockButton['type']
  // ) => {
  //   const { offsetX, offsetY } = calculateClickPosition(e)

  //   e.dataTransfer.setData('offsetX', offsetX.toString())
  //   e.dataTransfer.setData('offsetY', offsetY.toString())
  //   e.dataTransfer.setData('blockType', blockType)
  // }
  // const selectBlockButton = (type:BlockButton['type']) => {
  //   dispatch(setSelectedBlockButton(type))
  // }

  return (
    <div className="p-2 w-[250px] bg-[#f4f4f4] flex flex-col">
      <div className={isPreviewCode ? 'invisible' : ''}>
        <p className="py-2 text-xs opacity-25">Название сайта</p>
        <input
          type="text"
          value={projectName}
          onChange={(e) => dispatch(updateSiteTitle(e.target.value))}
        />
        <hr />
        <p className="py-2 text-xs opacity-25">Цвет фона страницы</p>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => dispatch(updateSiteBgColor(e.target.value))}
        />
        <hr />
        <p className="py-2 text-xs opacity-25">Базовый</p>
        <div className="grid grid-cols-2 gap-1">
          {blockButtons.slice(0, 8).map((block) => (
            // <div
            
            //   key={block.type}
              
            //   className="col bg-slate-200 hover:bg-slate-300 rounded-md p-1"
            //   onClick={() => dispatch(setSelectedBlockButton(block.type))}
            // >
            //   <div className="flex flex-col">
            //     <img className="m-auto" src={block.img} alt={block.type} />
            //     <div className="text-center ">
            //       <p className=" text-xs ">{block.label}</p>
            //     </div>
            //   </div>
            // </div>
            <BlockButton block={block}/>
          ))}
        </div>
        <hr />
        <p className="py-2 text-xs opacity-25">Форма</p>
        <div className="grid grid-cols-2 gap-1">
          {blockButtons.slice(8, 13).map((block) => (
            // <div
            //   key={block.type}
            //   className="col bg-slate-200 hover:bg-slate-300 rounded-md p-1"
            //   onClick={() => setSelectedBlockButton(block.type)}
            // >
            //   <div className="flex flex-col">
            //     <img className="m-auto" src={block.img} alt={block.type} />
            //     <div className="text-center ">
            //       <p className=" text-xs ">{block.label}</p>
            //     </div>
            //   </div>
            // </div>
            <BlockButton key={block.type} block={block}/>
          ))}
        </div>
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
