import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./HistoryOrder.css";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function HistoryOrder() {
  const user = useSelector((state) => state.userInfo.info);
  const [orders, setOrders] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 6;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / 6);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % orders.length;
    setItemOffset(newOffset);
  };
  const getOrdersByUser = async () => {
    const orders = await axios.get("/api/order/user", { userId: user.ID });
    setOrders(orders.data);
  };
  console.log(orders);
  useEffect(() => {
    getOrdersByUser();
  }, []);
  return (
    <MainLayout>
      <div className="historyOrder">
        <div className="container">
          <span className="title">Lịch sử mua hàng</span>
          <ul className="list">
            {currentItems.map((elem, index) => {
              return (
                <li className="item">
                  <div className="titleOrder d-flex justify-content-between mb-2">
                    <div className="userInfo d-flex flex-column">
                      <span className="id">Mã hóa đơn: {elem._id}</span>
                      <span className="nameBuyer">
                        Tên người mua: {elem.name}{" "}
                      </span>
                      <span className="address">
                        Địa chỉ: {elem.address.addressDetail},{" "}
                        {elem.address.ward}, {elem.address.district},{" "}
                        {elem.address.city}
                      </span>
                    </div>
                    <div className="status">
                      {elem.isVerify ? (
                        <span className="verify"> Đã xác nhận</span>
                      ) : (
                        <span className="verify"> Chưa xác nhận</span>
                      )}
                      <span className="mx-1">/</span>
                      {elem.isPaid ? (
                        <span className="paid"> Đã thanh toán</span>
                      ) : (
                        <span className="verify"> Chưa thanh toán</span>
                      )}
                    </div>
                  </div>
                  <ul className="listProduct">
                    {elem.orderItems.map((item, index) => {
                      return (
                        <li className="product d-flex justify-content-between align-items-center">
                          <div className="info d-flex">
                            <div className="img-wrap">
                              <img src={item.img} alt="" />
                            </div>
                            <div className="nameWrap d-flex flex-column justify-content-between">
                              <span className="name d-block">{item.name}</span>
                              <span className="size">Size: </span>
                            </div>
                          </div>
                          <span className="price">
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(1000000)}

                            {/* {Intl.NumberFormat("vi-VN", {
                             style: "currency",
                             currency: "VND",
                           }).format(
                             item.size.filter((size) => {
                               return size.sizeId === elem.size;
                             })[0].price * elem.count
                           )} */}
                          </span>
                          <div className="controls">
                            <button className="btn">Hủy</button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
            <li className="item">
              <div className="titleOrder d-flex justify-content-between mb-2">
                <div className="userInfo d-flex flex-column">
                  <span className="id">Mã hóa đơn</span>
                  <span className="nameBuyer">Tên người mua: </span>
                  <span className="address">Địa chỉ giao hàng: </span>
                </div>
                <div className="status">
                  <span className="verify">Đã xác nhận</span>
                  <span className="mx-1">/</span>
                  <span className="paid">Đã Thanh Toán</span>
                </div>
              </div>
              <ul className="listProduct">
                <li className="product d-flex justify-content-between align-items-center">
                  <div className="info d-flex">
                    <div className="img-wrap">
                      <img
                        src="https://hanoispiritofplace.com/wp-content/uploads/2017/11/hinh-nen-thien-nhien-dep-nhat-1.jpg  "
                        alt=""
                      />
                    </div>
                    <div className="nameWrap d-flex flex-column justify-content-between">
                      <span className="name d-block">Giày</span>
                      <span className="size">Size: </span>
                    </div>
                  </div>
                  <span className="price">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(1000000)}

                    {/* {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          item.size.filter((size) => {
                            return size.sizeId === elem.size;
                          })[0].price * elem.count
                        )} */}
                  </span>
                  <div className="controls">
                    <button className="btn">Hủy</button>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default HistoryOrder;
