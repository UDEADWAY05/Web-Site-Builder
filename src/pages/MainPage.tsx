import { useEffect, useMemo, useState } from 'react';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "src/components/ui/select";
import { useLastNode } from 'src/hooks/useLastNode';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { deleteSite, fetchSites } from 'src/store/slices/projectSlice';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';

export const Main = () => {
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.user);
    const { data: allSites, isLoading } = useAppSelector(store => store.project);

    const sortedSites = useMemo(() => {
        if (!allSites) return [];
        const sorted = [...allSites].sort((a, b) => {
            if (sort === 'asc') return a.title.localeCompare(b.title);
            return b.title.localeCompare(a.title);
        });
        return sorted;
    }, [allSites, sort]);

    const pagedSites = sortedSites.slice(0, page * pageSize);

    const lastNodeRef = useLastNode(isLoading, pagedSites.length < sortedSites.length, () => setPage(p => p + 1));

    useEffect(() => {
        if (user.data?.id) {
            dispatch(fetchSites());
        }
    }, [dispatch, user]);

    return (
        <div className="max-w-[1175px] w-full mx-auto p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold">Все проекты</p>
                <Select onValueChange={(v) => setSort(v as 'asc' | 'desc')}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">По имени A-Z</SelectItem>
                        <SelectItem value="desc">По имени Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
                {pagedSites.length === 0 && <div>
                    <h4 className='mt-10 text-2xl text-gray-400'>
                        Здесь пока пусто :)
                    </h4>
                    <p className='text-gray-400'> Создайте новый проект и он появится тут!</p>
                </div>
                }
                {pagedSites.map((el, index) => {
                    const isLast = index === pagedSites.length - 1;
                    return (
                        <div
                            key={el.id}
                            ref={isLast ? lastNodeRef : null}
                            className="w-[300px] rounded-md h-[200px] flex flex-col justify-between gap-4 border p-4"
                        >
                            <h5 className="text-xl font-bold">{el.title}</h5>
                            <div className="flex gap-2 justify-end">
                                <Link to={`/sites/${el.id}`}>
                                    <Button>Редактировать</Button>
                                </Link>
                                <Button className="bg-red-500 hover:bg-red-400" onClick={() => dispatch(deleteSite(el.id))}>Удалить</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
