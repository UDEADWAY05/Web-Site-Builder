// import { isUserLoggedIn } from "src/store/slices/userSlice/selectors";
// import { RootState } from "src/store/store";
// import { boolean } from "zod";

// describe('userSlice selectors',() => {
//     test('should select if user is authenticated',() => {
//         const user:RootState['user'] = { 
//             auth:boolean,
//             isLoading:false,
//             error:null,
//             isLoggedIn:true,
//             data:{
//                 id:'test',
//                 email:'test',
//                 name:'test',
//                 surname:'test'
//             }}
//         const result = isUserLoggedIn({user})

//         expect(result).toBe(true)
//     })
// })