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
import { setModalClose } from 'src/store/slices/siteSlice'
import { generateHTML } from 'src/utils/generateHTML'
import { generateCSS } from 'src/utils/generateCSS'
import { useAppSelector, useAppDispatch } from 'src/store/store'
import {
    selectorLayoutSiteData,
    selectorModalOpen,
} from 'src/store/slices/siteSlice/selectors'
import { exportSiteToZip } from 'src/utils/exportSiteToZip'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchSiteById } from 'src/store/slices/siteSlice/thunk'
import { Download, Code, Loader2 } from 'lucide-react';

export function SiteNew() {
    const blocks = useAppSelector(selectorLayoutSiteData)
    const site = useAppSelector((store) => store.site.data)
    const userId = useAppSelector(store => store.user.data?.id)
    const isModal = useAppSelector(selectorModalOpen)
    const { siteId } = useParams<{ siteId: string }>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (siteId) {
            dispatch(fetchSiteById(siteId))
        }
    }, [dispatch, siteId, userId])

    const formatCode = (code: string) => {
        let formatted = code;
        formatted = formatted.replace(/(<\/[^>]+>)/g, '$1\n');
        formatted = formatted.replace(/<([^\/][^>]*)>/g, '  <$1>');
        return formatted;
    };

    return (
        <>
            <div className="flex h-[calc(100vh-64px)]">
                <SideBar />
                <Canvas />
            </div>
            <Dialog open={isModal} onOpenChange={() => dispatch(setModalClose())}>
                <DialogContent className="w-[95vw] max-w-[1200px] p-0 rounded-lg"
                    style={{
                        width: 'fit-content',
                        maxWidth: 'min(1200px, 95vw)' //тут фигня с перекрытием стилей shadcn
                    }}
                >
                    <DialogHeader className="border-b p-4">
                        <DialogTitle className="text-xl font-semibold">Layout Web Site</DialogTitle>
                        <DialogDescription>Здесь представлен Ваш код</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col md:flex-row h-[60vh] overflow-hidden">
                        {!site ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <span className="ml-2">Загрузка данных...</span>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 border-r overflow-auto">
                                    <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b flex items-center">
                                        <Code className="h-4 w-4 mr-2" />

                                        <h3 className="font-medium">HTML + JS</h3>
                                    </div>
                                    <pre className="p-4 text-sm font-mono bg-white dark:bg-gray-900">
                                        <code className="whitespace-pre-wrap break-words">
                                            {blocks && formatCode(generateHTML(blocks, site))}
                                        </code>
                                    </pre>
                                </div>

                                <div className="flex-1 overflow-auto">
                                    <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b flex items-center">
                                        <Code className="h-4 w-4 mr-2" />
                                        <h3 className="font-medium">CSS</h3>
                                    </div>
                                    <pre className="p-4 text-sm font-mono bg-white dark:bg-gray-900">
                                        <code className="whitespace-pre-wrap">
                                            {blocks && formatCode(generateCSS(blocks))}
                                        </code>
                                    </pre>
                                </div>
                            </>
                        )}
                    </div>

                    <DialogFooter className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t">
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => dispatch(setModalClose())}
                                className="min-w-[200px]"
                            >
                                Вернуться в режим редактирования
                            </Button>
                            <Button
                                onClick={() => site && exportSiteToZip(blocks || [], site)}
                                disabled={!site}
                                className="min-w-[200px]"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Экспорт сайта в виде ZIP архива
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
