import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userInfo",
    initialState:
       {
            ID:"",
            name: "",
            email:"",
            isAdmin:""            
        },
    reducers:{ 
        userLogin: (state, action)=>{
            state = action.payload
            console.log(state)
        }
    }
})
export const {userLogin} = userSlice.actions

export default userSlice.reducer