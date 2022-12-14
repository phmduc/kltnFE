import MainLayout from '../../layouts/MainLayout/MainLayout';
import './Contact.css';
function Contact() {
  return (
    <MainLayout>
      <div className='contact'>
        <div className='container'>
          <div className='row'>
            <div className='col-xxl-6 col-md-12 col-sm-12'>
              <h3 className='contact__heading'>Trang liên hệ</h3>
              <p className='contact__title'>Địa chỉ chúng tôi</p>
              <p className='contact__content'>
                69 Nguyen Van Linh, Hai Chau District, Da Nang City, Vietnam
              </p>
              <p className='contact__title'>Email chúng tôi</p>
              <p className='contact__content'>rekeans@gmail.com</p>
              <p className='contact__title'>Điện thoại</p>
              <p className='contact__content'>+84969696969</p>
              <p className='contact__title'>Thời gian làm việc</p>
              <p className='contact__content'>10h00 - 22h00</p>
            </div>
            <div className='col-xxl-6 col-md-12 col-sm-12'>
              <img
                src='https://www.techrepublic.com/wp-content/uploads/2014/07/staticmapgoogle0514.png'
                alt='maps'
                className='banner__maps-img'
              />
            </div>
          </div>
        </div>
      </div>
      <img
        src='https://sneakerholicvietnam.vn/wp-content/uploads/2020/07/banner-sneakerholicvn2-1.jpg'
        alt='banner'
        className='contact__banner'
      />
    </MainLayout>
  );
}

export default Contact;
