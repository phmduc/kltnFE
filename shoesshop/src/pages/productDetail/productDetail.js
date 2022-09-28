import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useLocation} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slice/cartSlice"; 
import { useState, useEffect } from "react";
import axios from "axios";
import "./productDetail.scss"
function ProductDetail() {
    const listCart = useSelector((state)=>state.cart.listCart)
    const dispatch=useDispatch();
    const [item, setItem] = useState({})
    const path= useLocation().pathname.split("/")
    const ID = path[path.length - 1 ]
    console.log(listCart)
    async function getProductDetail() {
      try {
        const response = await axios.get(`/products/${ID}`);
        setItem(response.data)
      } catch (error) {
        console.error(error);
      }}
    useEffect(() => {
      getProductDetail()
    },[ID]);    
    const handleAddCart = ()=>{
      const itemAdd = {
          ID : item._id,
          name: item.name,
          price: item.price,
          size: "",
          count: 1,
      }
      // const hasItem = listCart.find((item,index)=>{return item.ID === ID})
      // if(hasItem){
      dispatch(addToCart(itemAdd))
      // }
      // else
      // {
      //   dispatch(updateQuantity(itemAdd))
      // }
  }
    return (       
      <MainLayout>
          <div className="item"> <p>{item.name}</p> <button onClick={()=>{handleAddCart()}}>Add To Cart</button></div>
      </MainLayout>
     );
}

export default ProductDetail;