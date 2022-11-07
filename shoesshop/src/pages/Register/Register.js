import "./Register.css";
import { useState } from "react";
import { registerUser } from "../../Redux/apiRequests";
function Register() {
  const [name, setName] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordSame, setPasswordSame] = useState();
  const [emailMessage, setEmailMessage] = useState();

  const submitRegister = async () => {
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    const result = await registerUser(newUser);
    if (typeof result === "string") {
      setEmailMessage(result);
    }
  };
  return (
    <div>
      <section className="register">
        <div className="container">
          <form>
            <h1>Đăng ký thành viên</h1>
            <div className="form-group">
              <p>Tên của bạn</p>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                aria-describedby="emailHelp"
              />
              {emailMessage ? (
                <p className="message mt-3">{emailMessage}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <p>Mật khẩu</p>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <p>Xác nhận mật khẩu</p>
              <input
                type="password"
                value={passwordSame}
                onChange={(e) => {
                  setPasswordSame(e.target.value);
                }}
                className="form-control"
              />
            </div>
            <button
              onClick={() => {
                submitRegister();
              }}
              type="button"
              className="btn btn-dark"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
