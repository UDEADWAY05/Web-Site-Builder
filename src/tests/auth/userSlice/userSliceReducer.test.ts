import { reducer, removeUser, setUser } from '../../../store/slices/userSlice' 

describe('user reducer',() => {
    test('should return initial state',() => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(
            { error:null,isLoggedIn:false,data:null }
        )
    }),
    
    test('should handle user added to store',() => {
        const initialState =  { error:null,isLoggedIn:false,data:null }

        expect(reducer(initialState,setUser({ id:'test',email:'test',name:'test',surname:'test' }))).toEqual(
            { error:null,isLoggedIn:true,data: { id:'test',email:'test',name:'test',surname:'test' }}
        )
    }),

    test('should reset user to initial state',() => {
        const nonEmptyState =  { error:null,isLoggedIn:true,data: { id:'test',email:'test',name:'test',surname:'test' }}

        expect(reducer(nonEmptyState,removeUser())).toEqual(
            { error:null,isLoggedIn:false,data:null }
        )
    })
})