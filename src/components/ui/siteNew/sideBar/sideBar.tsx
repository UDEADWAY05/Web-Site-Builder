import { useAppDispatch, useAppSelector } from 'src/store/store'
import { Button } from '../../button'
import { blockButtons } from 'src/constants/blockButtons'
import { setModalOpen, togglePreview } from 'src/store/slices/siteSlice/siteSlice'
import { selectSiteTitle, selectSiteBgColor, selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { BlockButton } from './BlockButton'
import { patchSiteThunk } from 'src/store/slices/siteSlice/thunk'
import { useParams } from 'react-router-dom'
import { exportSiteToZip } from 'src/utils/exportSiteToZip'
import { Download } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'src/components/ui/accordion'
import { Textarea } from '../../textarea'

export function SideBar() {
  const projectName = useAppSelector(selectSiteTitle)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreviewCode = useAppSelector(selectorPreview)
  const { error, isFetching, isLoading } = useAppSelector(store => store.site)
  const userId = useAppSelector(store => store.user.data?.id)
  const { siteId: id } = useParams()
  const site = useAppSelector(store => store.site.data)
  const dispatch = useAppDispatch()
  return (
    <div className="p-2 w-[250px] overflow-auto bg-[#f4f4f4] flex flex-col">
      <div className={isPreviewCode ? 'invisible' : ''}>
        <div className='rounded-full inline-flex items-center gap-2 px-2 justify-center bg-gray-700'>
          {
            !isFetching && error === null && <>
              <p className='text-green-500 font-semibold'>Все обновлено</p>
              <div className='size-3 rounded-full bg-green-500'></div>
            </>
          }
          {
            (isFetching || !userId) && <>
              <p className='text-amber-400 font-semibold'>{isLoading || !userId ? "Загрузка..." : "Сохранение..."}</p>
              <div className='size-3 rounded-full bg-amber-400'></div>
            </>
          }
          {
            !isFetching && error && userId && <>
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
            value={projectName || ''}
            onChange={(e) => dispatch(patchSiteThunk({ id: id, data: { title: e.target.value } }))}
          />
        }

        <hr />
        <p className="py-2 text-xs opacity-25">Цвет фона страницы</p>

        {
          id !== undefined && <input
            type="color"
            value={bgColor || '#fafafa'}
            onChange={(e) => dispatch(patchSiteThunk({ id: id, data: { bgColor: e.target.value } }))}
          />
        }

        {
          id !== undefined && <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Код для формы</AccordionTrigger>
              <AccordionContent>
                <Textarea value={site.formScript} onChange={(e) => dispatch(patchSiteThunk({ id: id, data: { formScript: e.target.value } }))} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        }

        <hr />
        <p className="py-2 text-xs opacity-25">Базовый</p>
        <div className="grid grid-cols-2 gap-1">
          {blockButtons.slice(0, 9).map((block) => (
            <BlockButton key={block.type} block={block} />
          ))}
        </div>
        <hr />
        <p className="py-2 text-xs opacity-25">Форма</p>
        <div className="grid grid-cols-2 gap-1">
          {blockButtons.slice(9, 14).map((block) => (
            <BlockButton key={block.type} block={block} />
          ))}
        </div>
      </div>
      <hr />
      <div className=" py-2 flex gap-2 flex-wrap items-center">
        <div className='flex gap-1'>
          <Button className="px-1" onClick={() => dispatch(togglePreview())}>
            {isPreviewCode ? 'Редактировать' : 'Предпросмотр'}
          </Button>
          <Button className="px-1" onClick={() => dispatch(setModalOpen())}>
            Посмотреть код
          </Button>
        </div>

        <Button
          onClick={() => site && exportSiteToZip(site.blocks || [], site)}
          disabled={!site}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          Экспортировать сайт ZIP
        </Button>
      </div>
    </div>
  )
}
