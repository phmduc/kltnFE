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
            state.info.ID = action.payload._id
            state.info.name = action.payload.name
            state.info.email = action.payload.email
            state.info.isAdmin = action.payload.isAdmin   
        }
    }
})
export const {userLogin, loginFailed} = userSlice.actions

export default userSlice.reducer