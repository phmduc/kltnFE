import Admin from "../../layouts/Admin/Admin";
import "./OrderAdmin.css";
import axios from "axios";
import { useState, useEffect } from "react";
function OrderAdmin() {
  const [isLoad, setLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrder();
  }, [isLoad]);
  async function getOrder() {
    try {
      const response = await axios.get("/api/order");
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Admin>
      <div className="OrderManage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="content table-responsive table-full-width">
                <table class="table table-hover table-striped">
                  <thead>
                    <th>Mã đơn</th>
                    <th>Thông tin đơn hàng</th>
                    <th>Sản phẩm</th>
                    <th>Giá trị</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </thead>
                  <tbody>
                    {orders.map((elem, index) => {
                      return (
                        <tr>
                          <td>{elem._id}</td>
                          <td>
                            <div className="info">
                              <span className="d-block">
                                Tên người nhận: {elem.name}
                              </span>
                              <span className="d-block">
                                Địa chỉ: {elem.address.addressDetail},
                                {elem.address.ward}, {elem.address.district},
                                {elem.address.city}
                              </span>
                            </div>
                          </td>
                          <td>
                            {elem.orderItems.map((item, index) => {
                              return (
                                <div className="item">
                                  <span className="d-block">{item.name}</span>
                                  <div className="price d-flex justify-content-between">
                                    <span>Size: {item.sizeId}</span>
                                    <span>Số lượng {item.count}</span>
                                    <span>Giá: {item.price}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </td>
                          <td>{elem.totalPrice}</td>
                          <td>
                            {elem.isPaid ? (
                              <span className="d-block">Đã thanh toán</span>
                            ) : (
                              <span className="d-block">Chưa thanh toán</span>
                            )}
                          </td>
                          <td className="controls">
                            <button
                              className="btn btn-primary w-100 mb-3"
                              onClick={(e) => {}}
                            >
                              Xác nhận
                            </button>
                            <button
                              className="btn btn-primary w-100"
                              onClick={(e) => {}}
                            >
                              Hủy
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default OrderAdmin;
