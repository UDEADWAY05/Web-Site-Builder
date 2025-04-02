import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export const checkUserData = createAsyncThunk(
  'user/checkData',
  async ({id,getUserById}:{id:string,getUserById:(id:string) => Promise<DocumentData | undefined>} ,thunkApi) => {
      const user = await getUserById(id)

      if (!user){
        throw new Error('Failed to fetch user from firebase')
      }
          
      return { id,email:user.email,name:user.name,surname:user.surname }     
    }    
)

