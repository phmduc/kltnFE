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
      if ($(elem).hasclassName("active")) {
        $(elem).parent().addclassName("active");
      }
    });
  }, []);

  const loadingStatus = useSelector((state) => state.loading.value);
  return (
    <div className="wrapperAdmin">
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo text-center">
            <a href="javascript:;" className="simple-text">
              Rekeans
            </a>
          </div>
          <ul className="nav">
            <li className="nav-item w-100 mb-3 ">
              <NavLink
                activeclassName="active"
                to="/admin/dashboard"
                className="d-flex align-items-center nav-link"
              >
                <i className="bi bi-speedometer"></i>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item w-100 mb-3">
              <NavLink
                activeclassName="active"
                to="/admin/products"
                className="d-flex align-items-center nav-link"
              >
                <i className="bi bi-archive"></i>
                Product
              </NavLink>
            </li>
            <li className="nav-item w-100 mb-3">
              <NavLink
                activeclassName="active"
                to="/admin/category"
                className="d-flex align-items-center nav-link"
              >
                <i className="bi bi-tag"></i>
                Category
              </NavLink>
            </li>
            <li className="nav-item w-100 mb-3">
              <NavLink
                to="/admin/user"
                activeclassName="active"
                className="d-flex align-items-center nav-link"
              >
                <i className="bi bi-person-circle"></i>
                User
              </NavLink>
            </li>
            <li className="nav-item w-100 ">
              <NavLink
                to="/admin/order"
                activeclassName="active"
                className="d-flex align-items-center nav-link"
              >
                <i class="bi bi-bag-check"></i>
                Order
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar-background"></div>
      </div>

      <div className="view">
        <nav class="navbar navbar-expand-lg " color-on-scroll="500">
          <div class="container-fluid">
            <a class="navbar-brand" href="#pablo">
              Template
            </a>
          </div>
        </nav>
        {loadingStatus === 0 ? <Loading></Loading> : children}
      </div>
    </div>
  );
}

export default Admin;
