import "./Header.scss"
import {Container, Row ,Col, Image} from 'react-bootstrap';
// import logo from '../assets/images/Rekeans.wepb';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
function Header() {

    return ( 
    <header>
        <div className="container">
            <div className="menu d-lg-block d-none">
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="img-wrap">
                            <img src="https://source.unsplash.com/random/1" alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ul className="list p-0 m-0">
                            <li className="items">
                                <a href="#">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="items">
                                <a href="#">
                                    Sản phẩm
                                </a>
                            </li>
                            <li className="items">
                                <a href="#">
                                    Blog
                                </a>
                            </li>
                            <li className="items">
                                <a href="#">
                                    Giới thiệu
                                </a>
                            </li>
                            <li className="items">
                                <a href="#">
                                    Liên hệ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul className="list-control p-0 m-0">
                            <li className="items-control has-input">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                            </li>
                            <li className="items-control">
                                <a href="#">
                                    <i class="bi bi-bag"></i>
                                </a>
                            </li>
                            <li className="items-control">
                                <a href="#">
                                    <i class="bi bi-person"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mb-menu d-lg-none d-block">
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="img-wrap">
                            <img src="https://source.unsplash.com/random/1" alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </header> 
    );
}

export default Header;