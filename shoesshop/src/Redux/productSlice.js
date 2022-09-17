import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[
            {
                ID:"",
                name:"",
                image:"",
                desc:"",
                price:"",
                countInStock:""
            }
        ]
    },
    reducers:{
        addProduct: (state, action) => {
            state.products=[...state.products, action.payload];
        },
        updateProduct:(state, action)=>{
            state.products.forEach((item, index)=>{
                if(item.ID === action.payload.ID){
                    item.name=action.payload.ID
                    item.image=action.payload.image
                    item.desc=action.payload.desc
                    item.price=action.payload.price
                    item.countInStock=action.payload.countInStock
                }
            })
        },
        deleteProduct:(state, action)=>{
            state.products.forEach((item, index)=>{
                if(item.ID === action.payload.ID){
                    state.products.splice(index,1)
                }
            })
        }
    }
})

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;