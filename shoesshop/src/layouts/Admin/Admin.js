import "./Admin.css";
import { getAllUser } from "../../Redux/slice/userSlice.js";
import $ from "jquery";
import $$ from "jquery";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading.js";
import { useDispatch, useSelector } from "react-redux";
function Admin({ children, props }) {
  useEffect(() => {
    $("#main-nav li a").each((index, elem) => {
      if ($(elem).hasClass("active")) {
        $(elem).parent().addClass("active");
      }
    });
  }, []);

  const loadingStatus = useSelector((state) => state.loading.value);
  return (
    <div className="wrapperAdmin">
      <div className="sideBar">
        <div className="logo text-center">
          <a href="/">Rekeans</a>
        </div>
        {/* <ul className="menu">
          <li>
            <a href="" className="active">
              Dashboard
            </a>
          </li>
          <li>
            <a href="">User</a>
          </li>
          <li>
            <a href="/admin/category">Category</a>
          </li>
          <li>
            <a href="/admin">Products</a>
          </li>
          <li>
            <a href="">Order</a>
          </li>
        </ul> */}
        <nav id="sidenav">
          <div id="sidenav-header">
            <div id="profile-picture">
              <img src="http://www.gravatar.com/avatar/fa4df8540bab3cb38f7dfa60c6e0522c.png" />
            </div>
            <a href="#" id="profile-link">
              Jesse Couch
            </a>
          </div>

          <ul id="main-nav">
            <li>
              <NavLink
                activeClassName="active"
                to="/admin/dashboard"
                className="d-flex"
              >
                <i class="bi bi-speedometer"></i>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                to="/admin/products"
                className="d-flex"
              >
                <i class="bi bi-archive"></i>
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                to="/admin/category"
                className="d-flex"
              >
                <i class="bi bi-tag"></i>
                Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/user"
                activeClassName="active"
                className="d-flex"
              >
                <i class="bi bi-person-circle"></i>
                User
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="view">
        <div className="logo">
          <a href="/">Rekeans</a>
        </div>
        {loadingStatus === 0 ? <Loading></Loading> : children}
      </div>
    </div>
  );
}

export default Admin;
