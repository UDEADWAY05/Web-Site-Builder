import { isUserAuthenticated } from "src/store/slices/userSlice/selectors";
import { RootState } from "src/store/store";

describe('userSlice selectors',() => {
    test('should select if user is authenticated',() => {
        const user:RootState['user'] = {id:'testId',email:'test_email'}
        const result = isUserAuthenticated({ user })

        expect(result).toBe(true)
    })
})