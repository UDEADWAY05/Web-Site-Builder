import { isUserLoggedIn } from "src/store/slices/userSlice/selectors";
import { RootState } from "src/store/store";

describe('userSlice selectors',() => {
    test('should select if user is authenticated',() => {
        const user:RootState['user'] = { 
            error:null,
            isLoggedIn:true,
            data:{
                id:'test',
                email:'test',
                name:'test',
                surname:'test'
            }}
        const result = isUserLoggedIn({user})

        expect(result).toBe(true)
    })
})