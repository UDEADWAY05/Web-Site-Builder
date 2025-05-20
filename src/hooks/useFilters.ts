import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { selectSiteFilters } from "src/store/slices/projectSlice/selectors";
import { updateSiteFilters } from "src/store/slices/projectSlice/slice";
import { SiteFilters } from "src/store/slices/projectSlice/types";
import { useAppDispatch, useAppSelector } from "src/store/store";

export function useFilters(){
    const [searchParams,setSearchParams] = useSearchParams()
    const filters = useAppSelector(selectSiteFilters)
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const updateQueryParams = (key: keyof SiteFilters,value: string) => {
        const newParams = new URLSearchParams(searchParams.toString())

        if (value){
            newParams.set(key, value.toString())
        }
        else {
            newParams.delete(key)
        }

        navigate(`${location.pathname}?${newParams.toString()}`)
        dispatch(updateSiteFilters({ key, value }))
    }

    useEffect(() => {
        searchParams.forEach((value,key) => {
            updateSiteFilters( {key, value })
            // dispatch(updateSiteFilters({ key,value }))
        })
    },[])

    return { filters, updateQueryParams }
}