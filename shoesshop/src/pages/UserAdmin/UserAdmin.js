import "./UserAdmin.css";
import Admin from "../../layouts/Admin/Admin";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalOrder from "../../components/ModalOrder/ModalOrder";
import ReactPaginate from "react-paginate";
import { Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
function UserAdmin() {
  const user = useSelector((state) => state.userInfo.info);

  const [isLoad, setLoaded] = useState(false);

  const [users, setUsers] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setendOffset] = useState(6);
  const [currentItems, setCurrent] = useState([]);
  const [pageCount, setPageCount] = useState();

  // let currentItems = hasResult
  //   ? result.slice(itemOffset, endOffset)
  //   : users.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(hasResult ? result.length / 6 : users.length / 6);
  const handlePageClick = (event) => {
    setItemOffset((event.selected * 6) % users.length);
    setendOffset(((event.selected * 6) % users.length) + 6);
    setLoaded(!isLoad);
  };
  useEffect(() => {
    getUser();
  }, [isLoad]);
  async function getUser() {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
      setCurrent(response.data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(response.data.length / 6));
    } catch (error) {
      console.error(error);
    }
  }
  const handleDelete = async (index) => {
    try {
      const res = await axios.delete(
        "/api/users/" + currentItems[index + 1]._id
      );
    } catch (err) {
      throw new Error("Invalid Product Data");
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
        users.filter((elem, index) => {
          return (
            elem.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            elem.email.toLowerCase().includes(e.target.value.toLowerCase())
          );
        })
      );
      setPageCount(
        Math.ceil(
          users.filter((elem, index) => {
            return (
              elem.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
              elem.email.toLowerCase().includes(e.target.value.toLowerCase())
            );
          }).length / 6
        )
      );
    }
  };
  return (
    <Admin>
      <div className="userManage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control my-3"
                placeholder="Nhập Tên hoặc Email"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                onChange={(e) => {
                  search(e);
                }}
              />
              <div class="content table-responsive table-full-width">
                <table class="table table-hover table-striped">
                  <thead>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Ngày tham gia</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </thead>
                  <tbody>
                    {currentItems.map((elem, index) => {
                      return (
                        <tr>
                          <td>{elem.name}</td>
                          <td>{elem.email}</td>
                          <td>{elem.date.split("@")[0]}</td>
                          <td>
                            {elem.isVerify ? (
                              <span className="d-block">Activated</span>
                            ) : (
                              <span className="d-block">Not Activated</span>
                            )}
                          </td>
                          <td className="controls">
                            {user.isAdmin === 0 ? (
                              <React.Fragment>
                                {elem._id !== user.ID ? (
                                  <button
                                    className="btn btn-primary w-100 mb-2"
                                    onClick={(e) => {
                                      handleDelete(index - 1);
                                    }}
                                  >
                                    <i className="bi bi-trash-fill"></i>
                                  </button>
                                ) : null}

                                <ModalOrder
                                  icon="Quyền"
                                  title="Cập nhật quyền "
                                >
                                  <div className="info">
                                    <div className="label">
                                      Tên: <span>{elem.name}</span>
                                    </div>
                                  </div>
                                  <div className="info">
                                    <div className="label">
                                      Email: <span>{elem.email}</span>
                                    </div>
                                  </div>
                                  <div className="info">
                                    <div className="label">
                                      Quyền hiện tại:{" "}
                                      <span>
                                        {elem.isAdmin === 0
                                          ? "Sở hữu"
                                          : elem.isAdmin === 1
                                          ? "Quản lý chung"
                                          : "Quyền User"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="change">
                                    <span className="title">
                                      Thay đổi quyền
                                    </span>
                                    <Form.Select
                                      defaultValue={elem.isAdmin}
                                      onChange={async (e) => {
                                        await axios.put(
                                          `/api/users/${elem._id}`,
                                          { isAdmin: e.target.value }
                                        );
                                        setLoaded(!isLoad);

                                        toast.success(`Thay đổi thành công`, {
                                          position: toast.POSITION.TOP_CENTER,
                                        });
                                      }}
                                    >
                                      <option value={null}>
                                        Chọn quyền...
                                      </option>
                                      <option value={0}>Quyền sở hữu</option>
                                      <option value={1}>Quyền quản lý</option>
                                      <option value={2}>Quyền user</option>
                                    </Form.Select>
                                  </div>
                                </ModalOrder>
                              </React.Fragment>
                            ) : null}
                            {user.isAdmin === 1 || user.isAdmin === 0 ? (
                              elem.isAdmin !== 0 ? (
                                elem._id !== user.ID ? (
                                  elem.isLock === 0 ? (
                                    <button
                                      className="btn btn-primary w-100 mt-2"
                                      onClick={async (e) => {
                                        await axios.put(
                                          `/api/users/${elem._id}`,
                                          {
                                            isLock: 1,
                                          }
                                        );
                                        setLoaded(!isLoad);
                                        toast.success(`Thay đổi thành công`, {
                                          position: toast.POSITION.TOP_CENTER,
                                        });
                                      }}
                                    >
                                      Khóa
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-primary w-100 mt-2"
                                      onClick={async (e) => {
                                        await axios.put(
                                          `/api/users/${elem._id}`,
                                          {
                                            isLock: 0,
                                          }
                                        );
                                        setLoaded(!isLoad);
                                        toast.success(`Thay đổi thành công`, {
                                          position: toast.POSITION.TOP_CENTER,
                                        });
                                      }}
                                    >
                                      Mở khóa
                                    </button>
                                  )
                                ) : null
                              ) : null
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

export default UserAdmin;
