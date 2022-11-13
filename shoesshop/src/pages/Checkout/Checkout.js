import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import "./Checkout.css";
import axios from "axios";
import { isFulfilled } from "@reduxjs/toolkit";

function Checkout() {
  const listCart = useSelector((state) => state.cart.listCart);
  const listProduct = useSelector((state) => state.product.productsList);
  const [province, setProvince] = useState([]);
  const [cityId, setCityId] = useState();
  const [districtId, setDistrictId] = useState();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  async function getProvince() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setProvince(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProvince();
  }, []);

  return (
    <MainLayout>
      <section className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="information">
                <span>Thông tin đặt hàng</span>
                <div className="form-group d-flex ">
                  <input type="text" placeholder="Họ" />
                  <input type="text" placeholder="Tên" />
                </div>
                <div className="address-select d-flex">
                  <select
                    class="form-select form-select-sm"
                    id="city"
                    onChange={(e) => {
                      setCityId(e.target.value);
                    }}
                  >
                    <option value="" selected>
                      Chọn tỉnh thành
                    </option>
                    {province.map((elem, index) => {
                      return <option value={elem.Id}>{elem.Name}</option>;
                    })}
                  </select>
                  <select
                    class="form-select form-select-sm"
                    id="district"
                    onChange={(e) => {
                      setDistrictId(e.target.value);
                    }}
                  >
                    <option value="" selected>
                      Chọn quận huyện
                    </option>
                    {province.map((elem, index) => {
                      if (parseInt(elem.Id) == cityId) {
                        return elem.Districts.map((district, index) => {
                          return (
                            <option value={district.Id}>{district.Name}</option>
                          );
                        });
                      }
                    })}
                  </select>
                  <select
                    class="form-select form-select-sm"
                    id="ward"
                    aria-label=".form-select-sm"
                  >
                    <option value="" selected>
                      Chọn phường xã
                    </option>
                    {province.map((elem, index) => {
                      if (parseInt(elem.Id) == cityId) {
                        return elem.Districts.map((district, index) => {
                          if (parseInt(district.Id) == districtId) {
                            return district.Wards.map((ward, index) => {
                              return <option value={index}>{ward.Name}</option>;
                            });
                          }
                        });
                      }
                    })}
                  </select>
                </div>
                <input
                  type="text"
                  className="d-block w-100"
                  placeholder="Địa chỉ cụ thể..."
                />
                <input
                  className="d-block w-100"
                  type="text"
                  placeholder="Số điện thoại"
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="receipt">
                <span className="title">Đơn hàng của bạn</span>
                <ul>
                  {listCart.map((elem, index) => {
                    return listProduct.map((item, index) => {
                      if (item._id === elem.ID) {
                        return (
                          <li className="item d-flex">
                            <div className="img-wrap">
                              <img src={item.image[0].url} alt="" />
                            </div>
                            <div className="desc d-flex flex-column justify-content-between">
                              <div className="name">{item.name}</div>
                              <div className="size">Size: {elem.size}</div>
                            </div>
                            <div className="priceWrap d-flex flex-column justify-content-between">
                              <div className="price">
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  item.size.filter((size) => {
                                    return size.sizeId === elem.size;
                                  })[0].price * elem.count
                                )}
                              </div>
                              <div className="count ">SL x {elem.count}</div>
                            </div>
                          </li>
                        );
                      }
                    });
                  })}
                </ul>
                <div className="totalPrice d-flex justify-content-between">
                  Tổng cộng:
                  <span>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      listCart.reduce((previousValue, currentValue) => {
                        let price = 0;
                        listProduct.forEach((elem, index) => {
                          if (elem._id === currentValue.ID) {
                            price = elem.size.find((size, index) => {
                              return size.sizeId === currentValue.size;
                            }).price;
                          }
                        });
                        return previousValue + currentValue.count * price;
                      }, 0)
                    )}
                  </span>
                </div>
                <button className="btn w-100">Check out</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Checkout;
