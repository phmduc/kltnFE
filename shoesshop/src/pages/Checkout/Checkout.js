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
  const [wardId, setWardId] = useState();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  const total = useRef();

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

  const submitOrder = async () => {
    const order = {
      user: "123",
      name: firstName + " " + lastName,
      orderItems: listCart.map((elem, index) => {
        return {
          ID: elem.ID,
          size: elem.size,
          count: elem.count,
          image: listProduct.filter((item, index) => {
            return item._id === elem.ID;
          })[0].image[0].url,
          price:
            listProduct
              .filter((item, index) => {
                return item._id === elem.ID;
              })[0]
              .size.filter((item, index) => {
                return item.sizeId === elem.size;
              })[0].price * elem.count,
        };
      }),
      address: {
        addressDetail: address,
        city: cityId,
        district: districtId,
        ward: wardId,
      },
      totalPrice: listCart.reduce((previousValue, currentValue) => {
        let price = 0;
        listProduct.forEach((elem, index) => {
          if (elem._id === currentValue.ID) {
            price = elem.size.find((size, index) => {
              return size.sizeId === currentValue.size;
            }).price;
          }
        });
        return previousValue + currentValue.count * price;
      }, 0),
    };

    console.log(order);
  };

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
                  <input
                    type="text"
                    placeholder="Họ"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Tên"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
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
                      return <option value={elem.Name}>{elem.Name}</option>;
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
                      if (elem.Name === cityId) {
                        return elem.Districts.map((district, index) => {
                          return (
                            <option value={district.Name}>
                              {district.Name}
                            </option>
                          );
                        });
                      }
                    })}
                  </select>
                  <select
                    class="form-select form-select-sm"
                    id="ward"
                    aria-label=".form-select-sm"
                    onChange={(e) => {
                      setWardId(e.target.value);
                    }}
                  >
                    <option value="" selected>
                      Chọn phường xã
                    </option>
                    {province.map((elem, index) => {
                      if (elem.Name === cityId) {
                        return elem.Districts.map((district, index) => {
                          if (district.Name === districtId) {
                            return district.Wards.map((ward, index) => {
                              return (
                                <option value={ward.Name}>{ward.Name}</option>
                              );
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
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <input
                  className="d-block w-100"
                  type="text"
                  placeholder="Số điện thoại"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
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
                  <span ref={total}>
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
                <button
                  onClick={() => {
                    submitOrder();
                  }}
                  className="btn w-100"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Checkout;
