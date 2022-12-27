import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./Contact.css";
function Contact() {
  return (
    <MainLayout>
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-md-12 col-sm-12">
              <h3 className="contact__heading">Trang liên hệ</h3>
              <p className="contact__title">Địa chỉ chúng tôi</p>
              <p className="contact__content">
                14 An Thuong 18, Ngu Hanh Son District, Da Nang City, Vietnam
              </p>
              <p className="contact__title">Email chúng tôi</p>
              <p className="contact__content">rekeans@gmail.com</p>
              <p className="contact__title">Điện thoại</p>
              <p className="contact__content">+84969696969</p>
              <p className="contact__title">Thời gian làm việc</p>
              <p className="contact__content">10h00 - 22h00</p>
            </div>
            <div className="col-xxl-6 col-md-12 col-sm-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.3291578691637!2d108.23828801433649!3d16.04840014425976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421762ef47bfbf%3A0x94a43a4a2ea325f5!2zMTQgQW4gVGjGsOG7o25nIDE4LCBC4bqvYyBN4bu5IFBow7osIE5nxakgSMOgbmggU8ahbiwgxJDDoCBO4bq1bmcgNTUwMDAsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1672154106884!5m2!1sen!2s"
                className="banner__maps-img"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://sneakerholicvietnam.vn/wp-content/uploads/2020/07/banner-sneakerholicvn2-1.jpg"
        alt="banner"
        className="contact__banner"
      />
    </MainLayout>
  );
}

export default Contact;
