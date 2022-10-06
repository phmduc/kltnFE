import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
       info: {
            ID:"",
            name: "",
            email:"",
            isAdmin:""            
        }
    },
    reducers:{ 
        userLogin: (state, action)=>{
            state.info = action.payload
        }
    }
})
export const {userLogin, loginFailed} = userSlice.actions

export default userSlice.reducer