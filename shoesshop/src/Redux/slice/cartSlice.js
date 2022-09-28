import { createSlice } from "@reduxjs/toolkit";

const cartItem= localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        listCart: cartItem,   
    },
    reducers:{
        addToCart: (state, action) => {
            const hasItem = state.listCart.find((item)=>item.ID === action.payload.ID)
            if (hasItem){
               hasItem.count += action.payload.count
               localStorage.setItem("cartItem",JSON.stringify(state.listCart))
            }
            else{
            state.listCart=[...state.listCart, action.payload];
            localStorage.setItem("cartItem",JSON.stringify(state.listCart))
            }
        },
        updateQuantity: (state, action) => {
            console.log(action.payload)
        },
    }
})
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;