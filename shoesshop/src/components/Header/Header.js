import "./Header.css"
import { Link } from "react-router-dom";

function Header() {

    return ( 
    <header>
        <div className="container">
            <div className="menu">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-4 ">
                        <div className="logo">
                          <a href="/">Rekeans</a>
                        </div>
                    </div>
                    <div className="col-6 d-lg-block d-none ">
                        <ul className="list p-0 m-0">
                            <li className="items">
                                <a href="#">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="items">
                                <Link to="/products">
                                    Sản phẩm
                                </Link>
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
                    <div className="col-lg-3 col-6">
                        <ul className="list-control p-0 m-0">
                            <li className="items-control has-input">
                                <div className="input-group">
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon1">
                                        <i className="bi bi-search"></i>
                                    </button>
                                    <input type="text" className="form-control" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                            </li>
                            <li className="items-control d-lg-flex d-none">
                                <a href="#">                                
                                    <svg width="33" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_85_350)">
                                        <path d="M29.8587 35.375H6.14149C5.65796 35.375 5.18007 35.2711 4.74018 35.0704C4.30029 34.8697 3.90867 34.5767 3.59184 34.2115C3.27501 33.8462 3.04036 33.4171 2.90379 32.9533C2.76721 32.4894 2.7319 32.0017 2.80024 31.523L5.62511 11.75H30.3751L33.2 31.523C33.2683 32.0017 33.233 32.4894 33.0964 32.9533C32.9599 33.4171 32.7252 33.8462 32.4084 34.2115C32.0915 34.5767 31.6999 34.8697 31.26 35.0704C30.8202 35.2711 30.3423 35.375 29.8587 35.375V35.375Z" stroke="#0F1419" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                                        <path d="M12.375 17.375V7.25C12.375 5.75816 12.9676 4.32742 14.0225 3.27252C15.0774 2.21763 16.5082 1.625 18 1.625V1.625C18.7387 1.625 19.4701 1.77049 20.1526 2.05318C20.8351 2.33586 21.4551 2.75019 21.9775 3.27252C22.4998 3.79485 22.9141 4.41495 23.1968 5.09741C23.4795 5.77986 23.625 6.51131 23.625 7.25V17.375" stroke="#0F1419" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_85_350">
                                        <rect width="36" height="36" fill="white" transform="translate(0 0.5)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </li>
                            <li className="items-control d-lg-flex d-none">
                                <a href="#">                               
                                    <svg width="27" height="37" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.375 23H11.625C6.03262 23 1.5 27.5326 1.5 33.125C1.5 33.125 6.5625 35.375 15 35.375C23.4375 35.375 28.5 33.125 28.5 33.125C28.5 27.5326 23.9674 23 18.375 23Z" stroke="#0F1419" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                                        <path d="M7.125 9.5C7.125 5.15075 10.6508 1.625 15 1.625C19.3492 1.625 22.875 5.15075 22.875 9.5C22.875 13.8492 19.3492 18.5 15 18.5C10.6508 18.5 7.125 13.8492 7.125 9.5Z" stroke="#0F1419" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-2 d-lg-none d-block">
                        <div id="menuToggle">
                            <input id="checkbox" type="checkbox" />
                            <label htmlFor="checkbox">
                                <span></span>
                                <span></span>
                                <span></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header> 
    );
}

export default Header;