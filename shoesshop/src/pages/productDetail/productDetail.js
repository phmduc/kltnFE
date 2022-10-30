import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slice/cartSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import "./productDetail.css";

function ProductDetail({ match }) {
  const listCart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const [item, setItem] = useState();
  const [error, setError] = useState("");
  const path = useLocation().pathname.split("/");
  const ID = path[path.length - 1];
  async function getProductDetail() {
    try {
      const response = await axios.get(`/api/products/${ID}`);
      setItem(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  console.log(item);
  useEffect(() => {
    getProductDetail();
  }, []);

  const handleAddCart = () => {
    const itemAdd = {
      ID: item._id,
      name: item.name,
      price: item.price,
      size: "",
      count: 1,
    };
    // const hasItem = listCart.find((item,index)=>{return item.ID === ID})
    // if(hasItem){
    dispatch(addToCart(itemAdd));
    // }
    // else
    // {

    // }
  };

  // Thumbnails

  return (
    <MainLayout>
      {item === undefined ? (
        <p>{error}</p>
      ) : (
        <div className="product">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="previewImg"></div>
              </div>
              <div className="col-lg-5">
                <div className="info">
                  <span className="name">{item.name}</span>
                  <div className="size">
                    <Tabs id="controlled-tab-example" className="mb-3">
                      {item.size.map((item, index) => {
                        return (
                          <Tab eventKey={`#size-${index}`} title={item.sizeId}>
                            {item.price}
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </div>

                  <div className="feature">
                    <span>Đặc trưng sản phẩm: </span>
                    <ul>
                      <li>Dạng bột</li>
                      <li>Giảm mụn nhờ khả năng làm sạch bã nhờn/kháng viêm</li>
                      <li>Phù hợp với cả da nhạy cảm</li>
                    </ul>
                  </div>
                  <div className="controls d-flex">
                    <a href="" className="btn cart">
                      Thêm vào giỏ hàng
                    </a>
                  </div>
                  <div className="policy">
                    <span>Chính sách và ưu đãi</span>
                    <ul>
                      <li>
                        <i className="bi bi-globe"></i> Free ship toàn quốc
                      </li>
                      <li>
                        <i className="bi bi-repeat"></i> Hoàn tiền 100% nếu
                        không hài lòng
                      </li>
                      <li>
                        <i className="bi bi-tag"></i>Có thể áp dụng mã giảm giá{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default ProductDetail;
