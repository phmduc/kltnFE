import "./ForgetPass.css";
import { validation } from "../../js/validation";
import { useState } from "react";
function ForgetPass() {
  const [email, setEmail] = useState();
  const [messageEmail, setMessageEmail] = useState();
  const checkmail = () => {
    if (validation.validateEmail(email) === true) {
    } else {
      setMessageEmail(validation.validateEmail(email));
    }
  };
  return (
    <div className="wrapperForget d-flex align-items-center justify-content-center flex-column">
      <div className="formForget ">
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
