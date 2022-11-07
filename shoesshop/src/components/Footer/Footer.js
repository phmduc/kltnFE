import { Link } from 'react-router-dom';
import './Footer.scss';
function Footer() {
  return (
    <div className='footer'>
      <div class='container-md text-center'>
        <div class='row'>
          <div class='col footer-des'>
            <h1>Rekeans</h1>
            <p>
              Sed lacus bibendum morbi nulla. Ipsum, faucibus vulputate in est
              amet, vitae.
            </p>
            <div>
              <a href='twiter.com'>
                <i class='bi bi-twitter'></i>
              </a>
              <a href='fb.com'>
                <i class='bi bi-facebook'></i>
              </a>
              <a href='instagram.com'>
                <i class='bi bi-instagram'></i>
              </a>
            </div>
          </div>
          <div class='col'></div>
          <div class='col'>
            <h5>Sản phẩm</h5>
            <ul>
              <Link to='/link'>
                <li>Giày nam</li>
              </Link>
              <Link to='/link'>
                <li>Giày nữ</li>
              </Link>
              <Link to='/link'>
                <li>Sale-off</li>
              </Link>
              <Link to='/link'>
                <li>Life style</li>
              </Link>
            </ul>
          </div>
          <div class='col'>
            <h5>Về công ty</h5>
            <ul>
              <Link to='/link'>
                <li>Về chúng tôi</li>
              </Link>
              <Link to='/link'>
                <li>Dịch vụ</li>
              </Link>
              <Link to='/link'>
                <li>Tuyển dụng</li>
              </Link>
              <Link to='/link'>
                <li>Lịch sử</li>
              </Link>
            </ul>
          </div>
          <div class='col'>
            <h5>Liên hệ</h5>
            <ul>
              <Link to='/link'>
                <li>Email góp ý</li>
              </Link>
              <Link to='/link'>
                <li>(406) 555 - 0120</li>
              </Link>
              <Link to='/link'>
                <li>rekeans@gmail.com</li>
              </Link>
            </ul>
          </div>
          <div class='col'>
            <h5>Hỗ Trợ</h5>
            <ul>
              <li>FAQs</li>
              <li>Bảo mật thông tin</li>
              <li>Chính sách đổi trả</li>
              <li>Tra cứu đơn hàng</li>
            </ul>
          </div>
        </div>
        <p className='copyright'>
          © Copyright 2022, All Rights Reserved by SonLe
        </p>
      </div>
    </div>
  );
}

export default Footer;
