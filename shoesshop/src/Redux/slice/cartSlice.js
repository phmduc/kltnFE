import { createSlice } from "@reduxjs/toolkit";

const cartItem= localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        listCart: cartItem,
        // listCart:[
        //     {
        //         ID:"",
        //         name:"",
        //         image:"",
        //         desc:"",
        //         price:"",
        //         size:[{
        //             sizeId:"",
        //             count:0,
        //         }],
        //     }
        // ],
        // total: (this.listCart.reduce((previousItem, currentItem)=>previousItem.price + currentItem.price,0)) || 0
    },
    reducers:{
        addToCart: (state, action) => {
            const hasItem = cartItem.find((item,index)=>{return item._id === action.payload._id})
            if (hasItem){
                this.updateCart(action.payload)
            }
            else{
            state.products=[...state.listCart, action.payload];
            }
            localStorage.setItem("cartItem",JSON.stringify(state.products))
        },
        updateCart: (state, action) => {
            state.products=[...state.listCart, action.payload];
        },
    }
})
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;