import "./Register.css";
import { useState } from "react";
import { registerUser } from "../../Redux/apiRequests";
import { validation } from "../../js/validation";
import { toast } from "react-toastify";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordSame, setPasswordSame] = useState();
  const [emailMessage, setEmailMessage] = useState();
  const [nameMessage, setNameMessage] = useState();
  const [passwordMessage, setPasswordMessage] = useState();
  const [rePasswordMessage, setRePasswordMessage] = useState();
  var currentdate = new Date();
  const submitRegister = async () => {
    if (validation.validateName(name) !== true) {
      setNameMessage(validation.validateName(name));
    }
    if (validation.validateEmail(email) !== true) {
      setEmailMessage(validation.validateEmail(email));
    }
    if (validation.validatePass(password) !== true) {
      setPasswordMessage(validation.validatePass(password));
    }
    if (validation.validateRePass(password, passwordSame) !== true) {
      setRePasswordMessage(validation.validateRePass(password, passwordSame));
    }
    if (
      validation.validateName(name) === true &&
      validation.validateEmail(email) === true &&
      validation.validatePass(password) === true &&
      validation.validateRePass(password, passwordSame) === true
    ) {
      const newUser = {
        name: name,
        email: email.toLowerCase(),
        password: password,
        date:
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          " @ " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds(),
      };
      const result = await registerUser(newUser);
      if (typeof result === "string") {
        setEmailMessage(result);
      } else {
        const web = `http://${window.location.host}/verify/${result._id}`;
        await axios.post("/api/email/send", {
          email: result.email,
          subject: "X??c th???c t??i kho???n",
          content: `<span>Nh???n v??o ???????ng link sau ????? x??c th???c t??i kho???n c???a b???n </span> <a href="${web}">Click Here</a>`,
        });
        toast.success("????ng k?? th??nh c??ng!!, Vui l??ng check mail x??c th???c", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/login");
      }
    }
  };
  return (
    <div>
      <section className="register">
        <div className="container">
          <form>
            <div className="logo text-center">
              <a href="/">Rekeans</a>
            </div>
            <h1>????ng k?? th??nh vi??n</h1>
            <div className="form-group">
              <p>T??n c???a b???n</p>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setNameMessage();
                  setName(e.target.value);
                }}
                className="form-control"
              />
              {nameMessage ? (
                <span className="message mt-3">{nameMessage}</span>
              ) : null}
            </div>
            <div className="form-group">
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmailMessage();

                  setEmail(e.target.value);
                }}
                className="form-control"
                aria-describedby="emailHelp"
              />
              {emailMessage ? (
                <span className="message mt-3">{emailMessage}</span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <p>M???t kh???u</p>
              <input
                value={password}
                onChange={(e) => {
                  setPasswordMessage();
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
              {passwordMessage ? (
                <span className="message mt-3">{passwordMessage}</span>
              ) : null}
            </div>
            <div className="form-group">
              <p>X??c nh???n m???t kh???u</p>
              <input
                type="password"
                value={passwordSame}
                onChange={(e) => {
                  setRePasswordMessage();
                  setPasswordSame(e.target.value);
                }}
                className="form-control"
              />
              {rePasswordMessage ? (
                <span className="message">{rePasswordMessage}</span>
              ) : null}
            </div>
            <button
              onClick={() => {
                submitRegister();
              }}
              type="button"
              className="btn btn-dark"
            >
              ????ng k??
            </button>
            <a href="/login" className="btn  mt-3">
              ????ng Nh???p
            </a>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
