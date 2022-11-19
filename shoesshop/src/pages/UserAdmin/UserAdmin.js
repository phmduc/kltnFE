import "./UserAdmin.css";
import Admin from "../../layouts/Admin/Admin";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
function UserAdmin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  const dispatch = useDispatch();
  async function getUser() {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(users);
  return (
    <Admin>
      <div className="categoryManage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title text-center py-3">
                <h2>Danh Sách Tài Khoản</h2>
              </div>

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
                    {users.map((elem, index) => {
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
                              onClick={() => {}}
                            >
                              <i className="bi bi-trash-fill"></i>
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

export default UserAdmin;
