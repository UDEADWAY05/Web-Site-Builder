import { useAppDispatch, useAppSelector } from 'src/store/store'
import { Button } from '../../button'
import { blockButtons } from 'src/constants/blockButtons'
import { setModalOpen, togglePreview } from 'src/store/slices/siteSlice/siteSlice'
import { selectSiteTitle, selectSiteBgColor, selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { BlockButton } from './BlockButton'
import { patchSiteThunk } from 'src/store/slices/projectSlice/thunks'
import { useParams } from 'react-router-dom'

export function SideBar() {
  const projectName = useAppSelector(selectSiteTitle)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreviewCode = useAppSelector(selectorPreview)
  const { isLoading, error } = useAppSelector(store => store.project)
  const { siteId: id } = useParams()
  const dispatch = useAppDispatch()

  return (
    <div className="p-2 w-[250px] bg-[#f4f4f4] flex flex-col">
      <div className={isPreviewCode ? 'invisible' : ''}>
        <div className='rounded-full inline-flex items-center gap-2 px-2 justify-center bg-gray-700'>
            {
                !isLoading && error === null && <>
                    <p className='text-green-500 font-semibold'>Все обновлено</p>
                    <div className='size-3 rounded-full bg-green-500'></div>      
                </>
            }
            {
                isLoading && <>
                    <p className='text-amber-400 font-semibold'>Сохранение...</p>
                    <div className='size-3 rounded-full bg-amber-400'></div>
                </>
            }    
            {
                !isLoading && error && <>
                    <p className='text-red-500 font-semibold'>Ошибка</p>
                    <div className='size-3 rounded-full bg-red-500'></div>
                </>
            }       
        </div>
        <p className="py-2 text-xs opacity-25">Название сайта</p>
        {
            id !== undefined && <input
                type="text"   
                placeholder='Введите название сайта...'
                className='w-full'
                value={projectName}
                onChange={(e) => dispatch(patchSiteThunk({ id: id, data: { title: e.target.value } }))}
            />    
        }

        <hr />
        <p className="py-2 text-xs opacity-25">Цвет фона страницы</p>
              
        {
            id !== undefined && <input
                type="color"
                value={bgColor}
                onChange={(e) => dispatch(patchSiteThunk({ id: id, data: { bgColor: e.target.value } }))}
            />
        }

        <hr />
        <p className="py-2 text-xs opacity-25">Базовый</p>
        <div className="grid grid-cols-2 gap-1">
          {blockButtons.slice(0, 8).map((block) => (
            <BlockButton key={block.type} block={block}/>
          ))}
        </div>
        <hr />
        <p className="py-2 text-xs opacity-25">Форма</p>
        <div className="grid grid-cols-2 gap-1">
          {blockButtons.slice(8, 13).map((block) => (
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
