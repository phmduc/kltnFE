import "./ForgetPass.css";
import { validation } from "../../js/validation";
import axios from "axios";
import { toast } from "react-toastify";

import { useState } from "react";
function ForgetPass() {
  const [email, setEmail] = useState();
  const [messageEmail, setMessageEmail] = useState();
  const checkmail = async () => {
    if (validation.validateEmail(email) === true) {
      try {
        const match = await axios.get(`/api/users/forgetpass/${email}`);
        if (match.data) {
          const web = `http://${window.location.host}/repass/${match.data._id}`;
          await axios.post("/api/email/send", {
            email: email,
            subject: "Thay đổi mật khẩu",
            content: `<span>Nhấn vào đường link sau để thay đổi mật khẩu </span> <a href="${web}">Click Here</a>`,
          });
          toast.success("Vui lòng check mail", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        setMessageEmail(error.response.data.message);
      }
    } else {
      setMessageEmail(validation.validateEmail(email));
    }
  };
  return (
    <div className="wrapperForget d-flex align-items-center justify-content-center flex-column">
      <div className="formForget ">
        <div className="logo text-center">
          <a href="/">Rekeans</a>
        </div>
        <span className="title">Lấy lại mật khẩu</span>
        <form>
          <div className="form-group">
            <label className="mb-3">Nhập email của bạn</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setMessageEmail();
                setEmail(e.target.value);
              }}
            />
            {messageEmail ? (
              <span className="message mt-3 d-block">{messageEmail}</span>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
            onClick={(e) => {
              e.preventDefault();
              checkmail();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
