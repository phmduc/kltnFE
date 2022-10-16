import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const categorySlice = createSlice({
    name:"category",
    initialState:{
        category:[
        ],
    },
    reducers:{
        getAllCategory: (state, action) => {
            state.category=action.payload;
        },
        // addProduct: (state, action) => {
        //     state.products=[...state.products, action.payload];
        // },
        // updateProduct:(state, action)=>{
        //     state.products.forEach((item, index)=>{
        //         if(item.ID === action.payload.ID){
        //             item.name=action.payload.ID
        //             item.image=action.payload.image
        //             item.desc=action.payload.desc
        //             item.price=action.payload.price
        //             item.countInStock=action.payload.countInStock
        //         }
        //     })
        // },
        // deleteProduct:(state, action)=>{
        //     state.products.forEach((item, index)=>{
        //         if(item.ID === action.payload.ID){
        //             state.products.splice(index,1)
        //         }
        //     })
        // }
    }
})

export const {getAllCategory} = categorySlice.actions;

export default categorySlice.reducer;   