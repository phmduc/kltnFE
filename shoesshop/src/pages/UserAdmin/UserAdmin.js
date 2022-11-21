import "./UserAdmin.css";
import Admin from "../../layouts/Admin/Admin";
import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
function UserAdmin() {
  const [isLoad, setLoaded] = useState(false);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, [isLoad]);
  async function getUser() {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDelete = async (index) => {
    try {
      const res = await axios.delete("/api/users/" + users[index]._id);
    } catch (err) {
      throw new Error("Invalid Product Data");
    }
    setLoaded(!isLoad);
  };
  return (
    <Admin>
      <div className="userManage">
        <div className="container">
          <div className="row">
            <div className="col-12">
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
                              onClick={(e) => {
                                handleDelete(index);
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default UserAdmin;
