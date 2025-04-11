import { Block } from "src/store/slices/layoutSite"; 

export function isBlockType(value:string):value is Block['type']{
    return ['text','paragraph','image','button','ul','ol'].includes(value)
}