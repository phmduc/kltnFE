import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { validation } from "../../js/validation";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RePass() {
  const navigate = useNavigate();

  const [oldPass, setOldPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState("");
  const [reNewPassMessage, setReNewPasswordMessage] = useState("");

  const [reNewPass, setReNewPass] = useState("");
  const path = useLocation().pathname.split("/");
  const ID = path[path.length - 1];
  const changePass = async () => {
    if (
      validation.validatePass(newPassword) &&
      validation.validatePass(newPassword, reNewPass)
    ) {
      const newPass = {
        newPass: newPassword,
      };
      await axios.put(`/api/users/repass/${ID}`, newPass);
      toast.success(`Đổi mật khẩu thành công`, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    } else {
      setNewPassword(validation.validatePass(newPassword));
      setNewPassword(validation.validatePass(newPassword, reNewPass));
    }
  };
  return (
    <div className="RePass wrapperForget d-flex align-items-center justify-content-center flex-column">
      <div className="formForget ">
        <div className="logo text-center">
          <a href="/">Rekeans</a>
        </div>
        <span className="title">Lấy lại mật khẩu</span>
        <form>
          <div className="form-group  mb-3">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              className="form-control "
              id="newPass"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            {newPasswordMessage ? (
              <span className="message">{newPasswordMessage}</span>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label>Nhập mật khẩu mới</label>
            <input
              type="password"
              className="form-control"
              id="reNewPass"
              value={reNewPass}
              onChange={(e) => {
                setReNewPass(e.target.value);
              }}
            />
            {reNewPassMessage ? (
              <span className="message">{reNewPassMessage}</span>
            ) : null}
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              changePass();
            }}
            className="btn btn-primary"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default RePass;
