import { Fragment } from "react";
import { useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../../layouts/MainLayout/MainLayout.js";
import "./Product.scss"


function Product() {
    const list = useSelector((state)=>state.product)
    const path= useLocation().pathname.split("/")
    const ID = path[path.length - 1 ]
    const item = list.products.filter((item, index)=> item._id===ID)[0]
    return (  
        <Fragment>
            <MainLayout>
                <p>{item.name}</p>
            </MainLayout>
        </Fragment>
     );
}

export default Product;