import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { useLastNode } from 'src/hooks/useLastNode'
import { deleteSite, fetchSites } from 'src/store/slices/siteSlice/thunks'
import { useAppSelector } from 'src/store/store'

export const Main = () => {
    // временная заглушка
    const [page, setPage] = useState(1)
    const dispatch = useAppDispatch()
    const user = useAppSelector(store => store.user)
    const { data: sites, isLoading, hasMore, lastKey } = useAppSelector(store => store.site)
    const lastNodeRef = useLastNode(isLoading, hasMore, setPage)

    useEffect(() => {
        if (hasMore && !isLoading && user.data?.id) {
            dispatch(fetchSites({ limit: 10, lastKey, userId: user.data?.id }))
        }
    }, [dispatch, page])

    const handleDelete = (id: string) => {
        dispatch(deleteSite(id))
    }

    return (
        <div data-testid="main-page" className='max-w-[1175px] w-full mx-auto p-5 flex flex-col gap-5'>
            <p>Все проекты</p>
            <div className='flex flex-wrap gap-4 justify-center items-center'>
                {
                    sites?.map((el, index) => {
                        const isLast = sites.length === index + 1
                        return <div ref={isLast ? lastNodeRef : null} className='w-[300px] rounded-md h-[200px] flex flex-col justify-between gap-4 border p-4' key={el.id}>
                            <h5 className='text-xl font-bold'>{el.title}</h5>
                            <div className='flex gap-2 justify-end'>
                                <Link to={`/sites/${el.id}`}>
                                    <Button >Редактировать</Button>
                                </Link>
                                <Button className='bg-red-500' onClick={() => handleDelete(el.id)}>Удалить</Button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
