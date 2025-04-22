import type { BlockButton, Site } from 'src/store/slices/siteSlice/types'
import {
    button,
    horozontal,
    list_ol,
    list_ul,
    photo,
    quote,
    title,
    paragraf,
} from '../assets'
import { SideBar } from 'src/components/ui/siteNew'
import { Canvas } from 'src/components/ui/siteNew'
import { Button } from 'src/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../components/ui/dialog'

import { useAppDispatch } from 'src/store/hooks'
import { setModalClose } from 'src/store/slices/siteSlice'
import { GenerateHTML } from 'src/components/ui/siteNew/generateHTML/generateHTML'
import { GenerateCSS } from 'src/components/ui/siteNew/generateCSS/generateCSS'
import { useAppSelector } from 'src/store/store'
import { selectorModalOpen } from 'src/store/slices/siteSlice/selectors'

export function SiteNew() {
    const isModal = useAppSelector(selectorModalOpen)
    const dispatch = useAppDispatch()
    // Кнопки для бокового меню
    const blockTypes: BlockButton[] = [
        {
            type: 'header',
            label: 'Заголовок',
            img: title,
        },
        {
            type: 'paragraph',
            label: 'Параграф',
            img: paragraf,
        },
        {
            type: 'ul',
            label: 'Маркированный',
            img: list_ul,
        },
        {
            type: 'ol',
            label: 'Нумерованный',
            img: list_ol,
        },
        // {
        //   type: 'image',
        //   label: 'Изображение',
        //   img: photo,
        // },
        // {
        //   type: 'divider',
        //   label: 'Разделитель',
        //   img: horozontal,
        // },
        {
            type: 'button',
            label: 'Кнопка',
            img: button
        },
        {
            type: 'quote',
            label: 'Цитата',
            img: quote,
        },
    ]

    return (
        <>
            <div className="flex h-screen">
                <SideBar blockTypes={blockTypes} />
                <Canvas blockTypes={blockTypes} />
            </div>
            <Dialog open={isModal}>
                <DialogContent className="p-2 sm:max-w-[1025px] w-full overflow-x-auto break-words">
                    <DialogHeader>
                        <DialogTitle>Layout Web Site</DialogTitle>
                        <DialogDescription>Здесь представлен Ваш код</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-between gap-4 py-2 ">
                        <pre>
                            <GenerateHTML />
                        </pre>
                        <pre>
                            <GenerateCSS />
                        </pre>
                    </div>
                    <DialogFooter onClick={() => dispatch(setModalClose())}>
                        <Button>Вернуться в режим редактирования</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
