import { reducer, removeUser, setUser } from '../../../store/slices/userSlice' 

describe('user reducer',() => {
    test('should return initial state',() => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(
            { id:null,email:null }
        )
    }),
    
    test('should handle user added to store',() => {
        const initialState = { id:null,email:null }

        expect(reducer(initialState,setUser({ id:'testId',email:'test_email' }))).toEqual(
            { id:'testId',email:'test_email' }
        )
    }),

    test('should reset user to initial state',() => {
        const nonEmptyState = { id:'testId',email:'test_email' }

        expect(reducer(nonEmptyState,removeUser())).toEqual(
            { id:null,email:null }
        )
    })
})