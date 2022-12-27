import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import './AboutUs.css';
function AboutUs() {
  return (
    <MainLayout>
      <div className='aboutus'>
        <div className='container'>
          <div className='aboutus__link'>
            <Link to='/'>HOME </Link>
            <span>/ </span>
            <Link to='/aboutus' className='sub-link'>
              CONNECT WITH US
            </Link>
          </div>
          <div className='about__content'>
            <h3 className='about__title'>CONNECT WITH US</h3>
            <p className='about__des'>
              Không dừng lại ở việc xây dựng nên một cửa hàng sneaker thông
              thường. Rekeans còn là nơi chứa đựng rất nhiều những cảm hứng,
              những ý tưởng và câu chuyện xoay quanh nền văn hoá sát mặt đất.
              Hãy đến, trải nghiệm và cùng chia sẻ câu chuyện thú vị của bạn
              xoay quanh những đôi giày nhé!
            </p>
            <div className='about__introduce d-flex'>
              <h5 className='about__info'>Tại sao nên chọn Rekeans?</h5>
              <div className='about__info-des'>
                <p>Giao hàng toàn quốc. Giao nhanh khu vực Đà Nẵng.</p>Sản phẩm
                luôn có sẵn tại cửa hàng. Không phải chờ order.
                <p>Mẫu mới update thường xuyên mỗi tháng.</p>​Đảm bảo chất lượng
                luôn đứng đầu trên thị trường.
                <p>​Dễ dàng đổi trả nếu không vừa hoặc không hài lòng.</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src='https://sneakerholicvietnam.vn/wp-content/uploads/2022/10/dscf9895.jpg'
          alt='banner-sneakers'
          className='about__banner'
        />
        <div className='container'>
          <div className='about__content'>
            <h3 className='about__local'>LOCATION</h3>
            <p className='about__address'>
              14 An Thuong 18, Ngu Hanh Son District, Da Nang City, Vietnam
            </p>
            <p className='about__phone'>Call +84969696969</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AboutUs;
