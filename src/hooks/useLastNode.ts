import { useCallback, useRef } from "react";

interface UseLastNodeOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export const useLastNode = (
    loading: boolean,
    hasMore: boolean,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    options?: UseLastNodeOptions
): (node: HTMLElement | null) => void => {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastNodeRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;

            // Отключаем предыдущий observer
            observer.current?.disconnect();

            // Создаем новый observer если есть еще элементы и node существует
            if (node && hasMore) {
                observer.current = new IntersectionObserver(
                    (entries) => {
                        if (entries[0].isIntersecting && hasMore && !loading) {
                            setPage((prevState) => prevState + 1);
                        }
                    },
                    {
                        root: options?.root || null,
                        rootMargin: options?.rootMargin || '50px',
                        threshold: options?.threshold || 1.0,
                    }
                );

                observer.current.observe(node);
            }
        },
        [loading, hasMore, setPage, options?.root, options?.rootMargin, options?.threshold]
    );

    return lastNodeRef;
};