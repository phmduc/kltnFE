import { addProduct, updateProduct, deleteProduct } from "./slice/productSlice";
import { userLogin, loginFailed } from "./slice/userSlice";
import { addCategory,deleteCategory, updateCategory } from "./slice/categorySlice";

import axios from "axios";

export const addproduct = async (product, dispatch)=>{ 
    try{
        const res = await axios.post("/api/products", product);
        dispatch(addProduct(res.data));
    } catch(err){   
        throw new Error("Invalid Product Data")
    }
}
export const updateproduct = async (product, dispatch)=>{ 
    try{
        const res = await axios.put("/api/products/"+product._id, product);
        dispatch(updateProduct(res.data));
    } catch(err){   
        throw new Error("Invalid Product Data")
    }
}
export const deleteproduct = async (product, dispatch)=>{ 
    try{
        const res = await axios.delete("/api/products/"+product._id);
        dispatch(deleteProduct(res.data));
    } catch(err){   
        throw new Error("Invalid Product Data")
    }
}
export const loginUser = async (users, dispatch)=>{ 
    try{
        const res = await axios.post("/api/users/login",users);
        console.log(res.data)
        dispatch(userLogin(res.data));
        return res.data
    } catch(err){   
        return err.response.data.message
    }
}
export const addcategory = async (category, dispatch)=>{ 
    try{
        const res = await axios.post("/api/category", category);
        dispatch(addCategory(res.data));
    } catch(err){   
        throw new Error("Invalid Category Data")
    }
}
export const deletecategory = async (category, dispatch)=>{ 
    try{
        const res = await axios.delete("/api/category/"+category._id);
        dispatch(deleteCategory(res.data));
    } catch(err){   
        throw new Error("Invalid category Data")
    }
}
export const updatecategory = async (category, dispatch)=>{ 
    try{
        console.log(category._id)
        const res = await axios.put("/api/category/"+category._id, category);
        dispatch(updateCategory(res.data));
    } catch(err){   
        throw new Error("Invalid Product Data")
    }
}