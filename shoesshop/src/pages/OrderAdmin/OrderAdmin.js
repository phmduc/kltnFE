import Admin from "../../layouts/Admin/Admin";
import "./OrderAdmin.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalOrder from "../../components/ModalOrder/ModalOrder";
import { useState, useEffect } from "react";
function OrderAdmin() {
  const [isLoad, setLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState([]);
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setendOffset] = useState(6);
  const [currentItems, setCurrent] = useState([]);
  const [pageCount, setPageCount] = useState();
  // const currentItems = hasResult
  //   ? result.slice(itemOffset, endOffset)
  //   : orders.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(
  //   hasResult ? result.length / 6 : orders.length / 6
  // );
  const handlePageClick = (event) => {
    setItemOffset((event.selected * 6) % orders.length);
    setendOffset(((event.selected * 6) % orders.length) + 6);
    setLoaded(!isLoad);
  };
  useEffect(() => {
    getOrder();
    getUser();
  }, [isLoad]);
  async function getOrder() {
    try {
      const response = await axios.get("/api/order");
      setOrders(response.data);
      setCurrent(response.data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(response.data.length / 6));
    } catch (error) {
      console.error(error);
    }
  }
  const handleDelete = async (index) => {
    try {
      const res = await axios.delete("/api/order/" + orders[index]._id);
    } catch (err) {
      throw new Error("Invalid Order Data");
    }
    setLoaded(!isLoad);
    toast.success(`Xóa thành công`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const search = async (e) => {
    if (!e.target.value) {
      setLoaded(!isLoad);
    } else {
      setCurrent(
        orders.filter((elem, index) => {
          return (
            elem._id.toLowerCase().includes(e.target.value.toLowerCase()) ||
            elem.name.toLowerCase().includes(e.target.value.toLowerCase())
          );
        })
      );
      setPageCount(
        Math.ceil(
          orders.filter((elem, index) => {
            return (
              elem._id.toLowerCase().includes(e.target.value.toLowerCase()) ||
              elem.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
          }).length / 6
        )
      );
    }
  };
  async function getUser() {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Admin>
      <div className="OrderManage">
        <div className="container">
          {/* Tab */}
          <div className="tab d-flex mb-3">
            <button
              className="btn"
              onClick={() => {
                getOrder();
              }}
            >
              Tất cả
            </button>
            <button
              className="btn"
              onClick={() => {
                setCurrent(
                  orders.filter((elem, index) => {
                    return elem.isCancel === true;
                  })
                );
              }}
            >
              Đã hủy
            </button>
            <button
              className="btn"
              onClick={() => {
                setCurrent(
                  orders.filter((elem, index) => {
                    return elem.isVerify === false && elem.isCancel === false;
                  })
                );
              }}
            >
              Chờ xác nhận
            </button>
            <button
              className="btn"
              onClick={() => {
                setCurrent(
                  orders.filter((elem, index) => {
                    return elem.isVerify === true && elem.isCancel === false;
                  })
                );
              }}
            >
              Đã xác nhận
            </button>
            <button
              className="btn"
              onClick={() => {
                setCurrent(
                  orders.filter((elem, index) => {
                    return elem.isPaid === false && elem.isCancel === false;
                  })
                );
              }}
            >
              Chưa thanh toán
            </button>
            <button
              className="btn"
              onClick={() => {
                setCurrent(
                  orders.filter((elem, index) => {
                    return elem.isPaid === true && elem.isCancel === false;
                  })
                );
              }}
            >
              Đã thanh toán
            </button>
          </div>
          {/*End Tab */}
          <div className="row">
            <div className="col-12">
              {/* Search */}
              <input
                type="text"
                className="form-control my-3"
                placeholder="Nhập tên người nhận hoặc id hóa đơn"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                onChange={(e) => {
                  setHasResult(true);
                  search(e);
                }}
              />
              {/* End Search  */}
              <div class="content table-responsive table-full-width">
                {/* Table  */}
                <table class="table table-hover table-striped">
                  <thead>
                    <th>Mã đơn</th>
                    <th>Thông tin đơn hàng</th>
                    <th className="text-center">Phương thức</th>
                    <th className="text-center">Giá trị</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Thao tác</th>
                  </thead>
                  <tbody>
                    {/* Render Table  */}
                    {currentItems.map((elem, index) => {
                      return (
                        <tr>
                          <td>{elem._id}</td>
                          <td className="address">
                            <div className="info">
                              <span className="d-block">
                                User:
                                {
                                  <span className="mx-2 name">
                                    {
                                      users.find((user) => {
                                        return elem.user === user._id;
                                      })?.email
                                    }
                                  </span>
                                }
                              </span>
                              <span className="d-block  mt-3 ">
                                Người nhận:
                                <span className="mx-2 name">{elem.name}</span>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="payment text-center d-block">
                              {elem.paymentMethod}
                            </span>
                          </td>
                          <td>
                            <span className="text-center d-block">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(elem.totalPrice)}
                            </span>
                          </td>
                          <td>
                            {elem.isPaid ? (
                              <span className="d-block text-center">
                                Đã thanh toán
                              </span>
                            ) : (
                              <span className="d-block text-center">
                                Chưa thanh toán
                              </span>
                            )}
                            {elem.isVerify ? (
                              elem.isDelivered === -1 ? (
                                <span className="d-block text-center">
                                  Đang giao
                                </span>
                              ) : elem.isDelivered === 1 ? (
                                <span className="d-block text-center">
                                  Đã giao
                                </span>
                              ) : (
                                <span className="d-block text-center">
                                  Giao thất bại
                                </span>
                              )
                            ) : null}
                          </td>
                          <td className="controls">
                            {elem.isCancel ? null : elem.isVerify ? (
                              <div className="btn btn-primary w-100 mb-3">
                                Đã xác nhận
                              </div>
                            ) : (
                              <button
                                className="btn btn-primary w-100 mb-3"
                                onClick={async (e) => {
                                  await axios.put(`/api/order/${elem._id}`);
                                  setLoaded(!isLoad);
                                }}
                              >
                                Xác nhận
                              </button>
                            )}
                            {elem.isCancel ? (
                              <div className="btn btn-primary w-100 mb-3">
                                Đã hủy
                              </div>
                            ) : !elem.isVerify ? (
                              <button
                                className="btn btn-primary w-100 mb-3"
                                onClick={async (e) => {
                                  await axios.put(
                                    `/api/order/cancel/${elem._id}`
                                  );
                                  const promise = elem.orderItems.map(
                                    async (product, index) => {
                                      await axios.put(
                                        `/api/products/updateqtt/${product.id}`,
                                        {
                                          sizeId: product.sizeId,
                                          count: -Number(product.count),
                                          fromOrder: elem._id,
                                        }
                                      );
                                    }
                                  );
                                  await Promise.all(promise);
                                  setLoaded(!isLoad);
                                }}
                              >
                                Hủy
                              </button>
                            ) : null}
                            {elem.isDelivered === 0 ? (
                              <button
                                className="btn btn-primary w-100 mb-3"
                                onClick={async (e) => {
                                  await axios.put(
                                    `/api/order/delivered/${elem._id}`,
                                    { bool: -1 }
                                  );
                                  setLoaded(!isLoad);
                                }}
                              >
                                Giao lại
                              </button>
                            ) : null}
                            {elem.isVerify ? (
                              elem.isDelivered === -1 ? (
                                <button
                                  className="btn btn-primary w-100 mb-3"
                                  onClick={async (e) => {
                                    await axios.put(
                                      `/api/order/delivered/${elem._id}`,
                                      { bool: 1 }
                                    );
                                    await axios.put(
                                      `/api/order/paid/${elem._id}`
                                    );
                                    setLoaded(!isLoad);
                                  }}
                                >
                                  Hoàn thành
                                </button>
                              ) : null
                            ) : null}
                            <ModalOrder
                              title="Chi tiết hóa đơn"
                              icon="Chi tiết"
                              size="lg"
                            >
                              <div className="detail__info">
                                <div className="info">
                                  <span>Mã hóa đơn: </span>
                                  <span>{elem._id}</span>
                                </div>
                                <div className="info">
                                  <span>Ngày lập: </span>
                                  <span>{elem.date.split("@")[0]}</span>
                                </div>
                                <div className="info">
                                  <span>Tài khoản: </span>
                                  <span>
                                    {
                                      users.find((user) => {
                                        return elem.user === user._id;
                                      })?.email
                                    }
                                  </span>
                                </div>
                                <div className="info">
                                  <span>Địa chỉ cụ thể: </span>
                                  <span>
                                    {elem.address.addressDetail},
                                    {elem.address.ward}, {elem.address.district}
                                    ,{elem.address.city}
                                  </span>
                                </div>
                                <div className="info">
                                  <span>Số điện thoại: </span>
                                  <span>{elem.phoneNumber}</span>
                                </div>

                                <div className="detail">
                                  <span className="title">
                                    Sản phẩm cụ thể:
                                  </span>
                                  <div className="detail__list">
                                    {elem.orderItems.map((item, index) => {
                                      return (
                                        <div className="item d-flex align-items-center">
                                          <div className="img-wrap">
                                            <img
                                              src={item.img}
                                              alt="sneaker"
                                              className="detail__img"
                                            />
                                          </div>
                                          <div className="d-inline-block detail__item">
                                            <span className="detail__item-name">
                                              {item.name}
                                            </span>
                                            <div className="price justify-content-between">
                                              <span>Size: {item.sizeId}</span>{" "}
                                              <p>
                                                Số lượng: {item.count}
                                                <span className="detail__item-price">
                                                  {Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                  }).format(item.price)}{" "}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="detail__price-total">
                                  <b>Giá trị hóa đơn:</b>{" "}
                                  <span>
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(elem.totalPrice)}{" "}
                                  </span>
                                </div>
                              </div>
                            </ModalOrder>
                            {/* <button
                              className="btn btn-primary w-100"
                              onClick={(e) => {
                                handleDelete(index);
                              }}
                            >
                              Xóa
                            </button> */}
                          </td>
                        </tr>
                      );
                    })}
                    {/*End Render Table  */}
                  </tbody>
                </table>
                {/* End Table  */}
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
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default OrderAdmin;
