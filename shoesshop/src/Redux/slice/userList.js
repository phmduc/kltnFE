import { createSlice } from "@reduxjs/toolkit";

const userListlice = createSlice({
    name: "users",
    initialState:{
        users:[]
    }, 
    reducers:{ 
        userLogin: (state, action)=>{
            state = action.payload
        }
    }
})
export const {userLogin} = userSlice.actions

export default userSlice.reducer