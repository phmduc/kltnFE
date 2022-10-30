import "./ProductCard.css";
import { Link } from "react-router-dom";
function ProductCard(props) {
  return (
    <div className="item">
      <Link to={`./${props.item._id}`} className="img-wrap">
        <img src={props.item.image[0].url} className="main" alt="" />
        <img src={props.item.image[1].url} className="forHover" alt="" />
      </Link>
      <div className="content d-flex flex-column mt-2">
        <a href="" className="name">
          {props.item.name}
        </a>
        <span>{props.item.size.length} size</span>
        <a className="price" href="">
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
