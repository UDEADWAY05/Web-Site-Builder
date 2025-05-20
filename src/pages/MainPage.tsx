import { useEffect, useMemo, useState } from 'react';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "src/components/ui/select";
import { useLastNode } from 'src/hooks/useLastNode';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { deleteSite, fetchSites } from 'src/store/slices/projectSlice';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { useFilters } from 'src/hooks/useFilters';

const PAGE_SIZE = 10;

export const Main = () => {
    const [page, setPage] = useState(1);
    const { filters, updateQueryParams } = useFilters()

    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.user);
    const { data: allSites, isLoading } = useAppSelector(store => store.project);

    const sortedSites = useMemo(() => {
        if (!allSites) return [];

        const sortedSites = [...allSites].sort((a, b) => {
            switch (filters.sort) {
                case 'asc':
                    return a.title.localeCompare(b.title)
                case 'desc':
                    return b.title.localeCompare(a.title)
                case 'newest':
                    return a.createdAt < b.createdAt ? 1 : -1
                case 'newest':
                    return a.createdAt < b.createdAt ? -1 : 1
                default: 
                    return a.title.localeCompare(b.title)
            }
            
        })
        const sortedAndFilteredSites = sortedSites.filter(el => el.title.toLowerCase().includes(filters.searchPhrase));

        return sortedAndFilteredSites;
    }, [allSites, filters]);

    const pagedSites = sortedSites.slice(0, page * PAGE_SIZE);

    const lastNodeRef = useLastNode(isLoading, pagedSites.length < sortedSites.length, () => setPage(p => p + 1));

    useEffect(() => {
        if (user.data?.id) {
            dispatch(fetchSites());
        }
    }, [dispatch, user]);

    return (
        <div className="max-w-[1175px] w-full mx-auto p-5 flex flex-col gap-5">
            <h3 className="text-3xl font-bold text-nowrap">Все проекты</h3>
            <div className="flex justify-between items-center gap-4">
                <Input placeholder='Поиск по названию' onChange={(e) => updateQueryParams('searchPhrase',e.target.value)} />
                <Select onValueChange={value => updateQueryParams('sort',value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">По имени A-Z</SelectItem>
                        <SelectItem value="desc">По имени Z-A</SelectItem>
                        <SelectItem value="oldest">Сначала старые</SelectItem>
                        <SelectItem value="newest">Сначала новые</SelectItem>
                    </SelectContent>
                </Select>
                
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
                {
                    isLoading && <div className='text-2xl'>Loading...</div>
                }
                {pagedSites.length === 0 && !isLoading && <div>
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
