import "./Remail.css";
import axios from "axios";
function Remail() {
  const id = window.location.href.split("/")[4];
  const Remail = async () => {
    const res = await axios.put(`/api/users/verify/${id}`);
  };
  return (
    <div className="verify text-center d-flex flex-column justify-content-center align-items-center">
      <i class="bi bi-check-circle"></i>
      <span>
        Tài Khoản Của Bạn Chưa được kích hoạt, Nếu chưa nhận được mail vui lòng
        ấn
        <button className="btn">Gửi lại mail</button>
      </span>
    </div>
  );
}

export default Remail;
