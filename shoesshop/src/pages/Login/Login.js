import "./Login.css";
import $ from "jquery";
import { useEffect } from "react";
import { useState } from "react";
import { loginUser } from "../../Redux/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState();
  const dispatch = useDispatch();
  useEffect(() => {}, [loginStatus]);

  const submitLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    const login = await loginUser(user, dispatch);
    if (typeof login === "object") {
      setLoginStatus(login);
      navigate("/");
    } else {
      setLoginStatus(login);
    }
  };
  return (
    <div>
      <section className="login">
        <div className="container">
          <form>
            <h1>Đăng nhập tại đây</h1>
            <div className="form-group">
              <p>Email</p>
              <input
                type="email"
                value={email}
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginStatus();
                }}
              ></input>
            </div>
            <div className="form-group">
              <p>Mật khẩu</p>
              <input
                type="password"
                value={password}
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginStatus();
                }}
              ></input>
            </div>
            {loginStatus ? (
              <div className="message mb-3">{loginStatus}</div>
            ) : null}
            <div className="form-group form-check">
              <div className="save-forget">
                <a href="#">Quên mật khẩu ?</a>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="submit"
                onClick={(e) => {
                  submitLogin(e);
                }}
                className="btn btn-dark"
              >
                Đăng nhập
              </button>
              <a href="/register" type="submit" className="btn btn-warning">
                Đăng ký
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
