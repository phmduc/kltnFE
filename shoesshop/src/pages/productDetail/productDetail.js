import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useLocation} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slice/cartSlice"; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./productDetail.scss"
function ProductDetail({ match }) {
    const listCart = useSelector((state)=>state.cart.listCart)
    const dispatch=useDispatch();
    const [item, setItem] = useState()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const path= useLocation().pathname.split("/")
    const ID = path[path.length - 1 ]
    async function getProductDetail() {
      try {
        const response = await axios.get(`/api/products/${ID}`);
        setItem(response.data)
      } catch (error) {
        setError(error.response.data.message)
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
          { (item) ? <div className="item"> <p>{item.name}</p> <button onClick={()=>{handleAddCart()}}>Add To Cart</button></div> : <p>{error}</p>}
      </MainLayout>
     );
}

export default ProductDetail;