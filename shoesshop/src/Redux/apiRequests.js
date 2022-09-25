import { addProduct, updateProduct, deleteProduct } from "./slice/productSlice";
import { userLogin } from "./slice/userSlice";
import axios from "axios";

export const addproduct = async (product, dispatch)=>{ 
    console.log(product)
    try{
        const res = await axios.post("/products", product);
        dispatch(addProduct(res.data));
    } catch(err){   
        throw new Error("Invalid Product Data")
    }
}
export const updateproduct = async (product, dispatch)=>{ 
    console.log(product)
    try{
        const res = await axios.put("/products/"+product._id, product);
        dispatch(updateProduct(res.data));
    } catch(err){   
        throw new Error("Invalid Product Data")
    }
}
export const deleteproduct = async (product, dispatch)=>{ 
    console.log(product)
    try{
        const res = await axios.delete("/products/"+product._id);
        dispatch(deleteProduct(res.data));
    } catch(err){   
        throw new Error("Invalid Product Data")
    }
}
export const loginUser = async (users, dispatch)=>{ 
    console.log(users)
    try{
        const res = await axios.post("/users/login",users);
        console.log(res.data)
        dispatch(userLogin(res.data));
    } catch(err){   
        throw new Error("Có lỗi xảy ra")
    }
}



// export const getproduct = async (product, dispatch)=>{ 
//     console.log(product)
//     try{
//         const res = await axios.get("/products", product);
//         dispatch(addProduct(res.data));
//     } catch(err){   
//         throw new Error("Invalid Product Data")
//     }
// }