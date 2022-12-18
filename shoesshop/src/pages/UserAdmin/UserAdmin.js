import "./UserAdmin.css";
import Admin from "../../layouts/Admin/Admin";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
function UserAdmin() {
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Active</th>
                    <th>Controls</th>
                  </thead>
                  <tbody>
                    {currentItems.map((elem, index) => {
                      return (
                        <tr>
                          <td>{elem.name}</td>
                          <td>{elem.email}</td>
                          <td>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="exampleCheck1"
                              defaultChecked={elem.isAdmin}
                              onChange={async (e) => {
                                const res = await axios.put(
                                  "/api/users/" + elem._id,
                                  { isAdmin: e.target.checked }
                                );
                                setLoaded(!isLoad);
                                toast.success(`Thay đổi thành công`, {
                                  position: toast.POSITION.TOP_CENTER,
                                });
                              }}
                            />
                          </td>
                          <td>
                            {elem.isVerify ? (
                              <span className="d-block">Activated</span>
                            ) : (
                              <span className="d-block">Not Activated</span>
                            )}
                          </td>
                          <td className="controls">
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                handleDelete(index - 1);
                              }}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
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
