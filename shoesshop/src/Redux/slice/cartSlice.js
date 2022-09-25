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
            console.log(state.listCart)
            const hasItem = state.listCart.find((item,index)=>{return item._id === action.payload._id})
            console.log(hasItem.A)
            if (hasItem){
                console.log(state)
                cartSlice.reducers.updateCart(action.payload)
            }
            else{
            state.listCart=[...state.listCart, action.payload];
            localStorage.setItem("cartItem",JSON.stringify(state.listCart))
            }
        },
        updateCart: (state, action) => {
            console.log(action.payload)
        },
    }
})
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;