import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slice/cartSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import { toast } from "react-toastify";
import { Fancybox, Carousel } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import $ from "jquery";

import "./productDetail.css";

function ProductDetail({ match }) {
  const listCart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const [item, setItem] = useState();
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);
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
  useEffect(() => {
    getProductDetail();
  }, [ID]);
  const handleAddCart = () => {
    const size = $(".size .nav-link.active").html();
    let countInStock;
    item.size.map((item, index) => {
      if (size === item.sizeId) {
        countInStock = item.count;
      }
    });
    if (count <= countInStock) {
      const itemAdd = {
        ID: item._id,
        size: size,
        count: count,
      };
      dispatch(addToCart(itemAdd));
      toast.success(`Thêm thành công`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(
        `Vượt quá số lượng trong kho, Hiện tại còn ${countInStock} Sản phẩm`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
    if (count === 0) {
      toast.error(`Vui lòng nhập số lượng`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <MainLayout>
      {item === undefined ? (
        <p>{error}</p>
      ) : (
        <div className="product">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="previewImg">
                  <Tabs id="imageTab" className="mb-3">
                    {item.image.map((item, index) => {
                      return (
                        <Tab
                          eventKey={`#image-${index}`}
                          title={<img className="img-fluid" src={item.url} />}
                        >
                          <a
                            data-fancybox="gallery"
                            href={item.url}
                            className="img-wrap"
                          >
                            <img src={item.url} alt="" />
                          </a>
                        </Tab>
                      );
                    })}
                  </Tabs>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="info">
                  <span className="name">{item.name}</span>
                  <div className="size my-3">
                    <span>Size:</span>
                    <Tabs id="sizeTab" className="mb-3">
                      {item.size.map((item, index) => {
                        return (
                          <Tab
                            eventKey={`#size-${index}`}
                            onSelect={(e) => {}}
                            title={item.sizeId}
                          >
                            <span className="price">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price)}
                            </span>
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </div>
                  <div class="count d-flex align-items-center mb-3">
                    Số lượng
                    <div class="number">
                      <button
                        onClick={() => {
                          if (count <= 0) {
                            setCount(0);
                          } else setCount(count - 1);
                        }}
                        class="minus"
                      >
                        -
                      </button>
                      <input
                        onChange={(e) => {
                          setCount(e.target.value);
                        }}
                        type="text"
                        value={count}
                      />
                      <button
                        onClick={() => {
                          setCount(count + 1);
                        }}
                        class="plus"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="controls d-flex">
                    <button
                      onClick={(e) => {
                        handleAddCart();
                      }}
                      className="btn cart"
                    >
                      Thêm vào giỏ hàng
                    </button>
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
              <div className="col-12">
                <div className="desc mt-3">
                  <span>Mô Tả</span>
                  <p className="mt-3">&emsp; {item.desc}</p>
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
