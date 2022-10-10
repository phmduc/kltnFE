import MainLayout from "../../layouts/MainLayout/MainLayout";
import { Fragment } from "react";
import { useEffect } from "react";
import "./Home.css"
import { useSelector  } from "react-redux";

function Home( props ) {

   useEffect(()=>
   {},[props])
    return ( 
        <MainLayout>
            <section className="w-bannerHero py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <div className="title">
                                <h1>MỘT KHOẢNH KHẮC CHO PHONG CÁCH CỦA BẠN</h1>
                                <span>Eu vel cras sagittis suspendisse. Magnis sit tristique vitae dictumst molestie sed. Sed euismod porttitor viverra vitae id scelerisque urna a. Massa varius enim, lectus tortor dignissim.</span>
                                <a href="">Khám phá ngay</a>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="img-wrap">
                                <img src="https://source.unsplash.com/random/1" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
            <section className="w-client">       
                <div className="container">
                    <div className="list d-flex justify-content-between align-items-center">
                        <svg width="184" height="66" viewBox="0 0 184 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.2966 65.7609C14.8141 65.5431 10.3287 64.0429 6.82141 61.2566C6.15207 60.7244 4.55709 59.1284 4.02199 58.4553C2.59975 56.667 1.63281 54.9265 0.987872 52.9954C-0.996697 47.0511 0.0246895 39.2508 3.90934 30.6901C7.23541 23.3611 12.3677 16.0922 21.3217 6.0248C22.6407 4.54339 26.5685 0.210968 26.5939 0.210968C26.6033 0.210968 26.3892 0.581782 26.1198 1.03334C23.7916 4.933 21.7996 9.52641 20.7143 13.5031C18.971 19.8839 19.1813 25.3598 21.3302 29.6058C22.8125 32.5311 25.3538 35.0648 28.2114 36.4655C33.2141 38.9166 40.5384 39.1194 49.4831 37.0588C50.0989 36.9161 80.6147 28.8154 117.296 19.0569C153.978 9.29735 183.995 1.31872 184 1.32529C184.01 1.33375 98.7781 37.8051 54.5327 56.7261C47.5257 59.7217 45.6519 60.4784 42.3578 61.635C33.937 64.5921 26.3939 66.0031 20.2966 65.7609Z" fill="#667085"/>
                        </svg>               
                        <svg width="185" height="126" viewBox="0 0 185 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_50_25)">
                            <path d="M121.095 82.3388L83.261 16.5869L110.441 0.975189L157.487 82.3388H121.095Z" fill="#667085"/>
                            <path d="M20.322 73.1266L47.5018 57.4094L61.8829 82.3389H25.5962L20.322 73.1266Z" fill="#667085"/>
                            <path d="M73.662 124.286H81.3975V92.9928H73.662V124.286Z" fill="#667085"/>
                            <path d="M170.602 125.025C161.952 125.025 156.748 120.559 156.467 114.266H164.625C164.625 116.235 165.855 119.118 171.129 119.223C174.646 119.223 176.298 117.149 176.298 115.602C176.087 113.14 172.993 112.929 169.688 112.402C166.383 111.875 163.57 111.277 161.53 110.222C158.928 108.886 157.17 106.003 157.17 102.697C157.17 97.1067 162.023 92.6764 170.11 92.6764C177.951 92.6764 182.908 96.7903 183.436 102.908H175.56C175.489 101.256 175.173 98.6538 170.532 98.6538C167.402 98.6538 165.328 99.2867 165.152 101.467C165.152 104.666 171.657 104.455 176.72 105.792C181.572 107.022 184.667 110.046 184.667 114.266C184.667 122.036 178.373 125.025 170.602 125.025Z" fill="#667085"/>
                            <path d="M52.1783 45.2084L79.3582 29.5264L109.843 82.3389H81.3975V90.0744H73.662V82.3037L52.1783 45.2084Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M52.8816 125.025C43.8802 125.025 36.5667 117.676 36.5667 108.78C36.5667 99.7789 43.8802 92.6764 52.8816 92.6764C56.2922 92.6764 59.3865 93.5905 62.0939 95.4541V82.3389H69.8294V124.286H62.0939V122.212C59.3865 123.97 56.2922 125.025 52.8816 125.025ZM43.9857 108.78C43.9857 113.633 48.1348 117.676 53.0925 117.676C57.9448 117.676 62.0939 113.633 62.0939 108.78C62.0939 103.928 57.9448 99.7789 53.0925 99.7789C48.1348 99.7789 43.9857 103.928 43.9857 108.78Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M110.054 82.3389H117.684V124.286H110.054V122.212C107.452 123.97 104.253 125.025 100.736 125.025C91.8406 125.025 84.527 117.676 84.527 108.78C84.527 99.7789 91.8406 92.6764 100.736 92.6764C104.253 92.6764 107.347 93.5905 110.054 95.4541V82.3389ZM92.0515 108.78C92.0515 113.633 96.2006 117.676 100.947 117.676C105.905 117.676 110.054 113.633 110.054 108.78C110.054 103.928 105.905 99.7789 100.947 99.7789C96.2006 99.7789 92.0515 103.928 92.0515 108.78Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M136.496 125.025C127.635 125.025 120.286 117.676 120.286 108.78C120.286 99.779 127.635 92.6764 136.496 92.6764C139.906 92.6764 143.106 93.5906 145.708 95.4541V92.9577H153.443V124.287H145.708V122.212C143.106 123.97 140.012 125.025 136.496 125.025ZM127.811 108.78C127.811 113.633 131.96 117.676 136.812 117.676C141.664 117.676 145.708 113.633 145.708 108.78C145.708 103.928 141.664 99.779 136.812 99.779C131.96 99.779 127.811 103.928 127.811 108.78Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.12098 108.78C8.12098 113.633 12.27 117.676 17.1223 117.676C22.0801 117.676 26.2291 113.633 26.2291 108.78C26.2291 103.928 22.0801 99.779 17.1223 99.779C12.27 99.779 8.12098 103.928 8.12098 108.78ZM16.9113 125.025C8.01549 125.025 0.666748 117.676 0.666748 108.78C0.666748 99.779 8.01549 92.6764 16.9113 92.6764C20.322 92.6764 23.5217 93.5906 26.2291 95.4541V92.9577H33.8592V124.287H26.2291V122.212C23.6272 123.97 20.4275 125.025 16.9113 125.025Z" fill="#667085"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_50_25">
                            <rect width="184" height="124.05" fill="white" transform="translate(0.666748 0.975159)"/>
                            </clipPath>
                            </defs>
                        </svg>           
                        <svg width="185" height="184" viewBox="0 0 185 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.45117 35.7498H26.2435L36.1023 103.554L45.7197 35.7498H167.625L163.538 55.226H60.6282L44.999 144.43H27.2057L8.45117 35.7498Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M170.751 119.183C171.232 129.762 165.221 145.872 151.996 145.872C136.609 145.872 133.242 126.878 133.242 118.943H145.745C145.745 123.511 149.593 128.08 152.478 128.08C155.363 128.08 158.25 124.473 158.25 122.069C158.25 119.664 157.288 116.058 152.72 112.932C137.811 104.035 134.445 93.6953 134.445 84.7997C133.964 74.2201 139.012 58.5909 152.237 58.5909C165.463 58.5909 169.069 77.1058 169.069 84.7997H157.288C157.288 80.4716 154.402 77.3463 151.517 77.3463C148.632 77.3463 146.707 80.2311 146.707 82.6366C146.707 85.0412 147.188 87.2052 151.758 90.3305C158.008 93.2161 170.751 102.593 170.751 119.183ZM171.465 139.622C171.971 139.621 172.473 139.72 172.941 139.914C173.409 140.107 173.834 140.391 174.192 140.749C174.55 141.107 174.833 141.532 175.027 142C175.22 142.468 175.319 142.969 175.319 143.475C175.322 143.984 175.225 144.487 175.032 144.958C174.84 145.428 174.557 145.856 174.199 146.216C173.841 146.576 173.415 146.862 172.945 147.058C172.476 147.253 171.973 147.353 171.465 147.353C170.955 147.354 170.451 147.255 169.979 147.061C169.508 146.867 169.08 146.581 168.72 146.221C168.36 145.86 168.074 145.432 167.88 144.961C167.685 144.49 167.586 143.985 167.588 143.475C167.588 141.342 169.321 139.622 171.465 139.622V138.725C168.823 138.725 166.69 140.858 166.69 143.476C166.689 144.104 166.812 144.725 167.052 145.305C167.292 145.884 167.643 146.411 168.087 146.855C168.53 147.298 169.057 147.65 169.637 147.89C170.216 148.129 170.838 148.252 171.465 148.251C174.082 148.251 176.216 146.119 176.216 143.476C176.214 142.217 175.713 141.01 174.822 140.119C173.932 139.229 172.724 138.728 171.465 138.725V139.622Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M170.508 141.695H171.756C172.253 141.695 172.981 141.695 172.981 142.36C172.981 143.015 172.58 143.149 172.011 143.136H170.508V143.9H171.514L172.652 146.081H173.828L172.579 143.9C173.489 143.839 173.985 143.451 173.985 142.519C173.985 141.985 173.84 141.488 173.379 141.186C172.991 140.944 172.422 140.931 171.986 140.931H169.5V146.081H170.507V141.695H170.508ZM66.8788 115.578L71.688 84.3195L76.4971 115.578H66.8788ZM63.9941 133.13H78.9017L80.8252 144.43H104.628V99.7082L119.295 144.43H131.558V61.2369H119.055V103.555L105.11 61.2369H92.1264V139.381L78.6611 61.2369H64.7148L50.2883 144.43H62.5508L63.9941 133.13Z" fill="#667085"/>
                        </svg>             
                        <svg width="184" height="124" viewBox="0 0 184 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M69.0337 69.3621L68.9581 50.7006L86.825 44.0725L68.8318 38.1795L68.4548 19.793L57.5398 34.6278L39.6851 29.1234L50.0494 44.696L39.9328 60.2972L57.555 54.4567L69.0337 69.3621Z" fill="#667085"/>
                            <path d="M71.2651 88.9782H103.268L143.377 44.6216L103.074 0.210876H71.3803L109.074 44.5564L71.2651 88.9782Z" fill="#667085"/>
                            <path d="M0 112.854C0 107.09 4.87323 101.421 11.5334 101.421C16.0701 101.421 21.1613 106.536 21.1613 106.536L15.6454 109.745C15.6454 109.745 14.7342 107.338 11.3328 107.338C7.87522 107.338 5.84072 110.177 5.81686 112.754C5.79019 115.634 8.1515 118.169 11.1323 118.169C13.471 118.169 15.9462 115.662 15.9462 115.662L20.6599 119.072C20.6599 119.072 17.1326 123.384 11.2326 123.384C5.32083 123.384 0 119.82 0 112.854Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M34.3906 101.713C28.187 101.713 23.167 106.668 23.167 112.761C23.167 118.853 28.187 123.789 34.3906 123.789C40.5942 123.789 45.6337 118.853 45.6337 112.761C45.6337 106.668 40.5942 101.713 34.3906 101.713ZM34.3906 107.237C37.4924 107.237 40.0121 109.714 40.0121 112.761C40.0121 115.807 37.4924 118.265 34.3906 118.265C31.2888 118.265 28.7885 115.807 28.7885 112.761C28.7885 109.714 31.2888 107.237 34.3906 107.237Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M49.8503 102.025V122.676H55.2572V111.515L64.1775 122.676H69.5063V102.025H64.0799V114.094L55.2572 102.025H49.8503Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M73.9177 102.025L81.2179 122.676H89.2599L96.5601 102.025H90.6458L85.2389 118.421L79.8321 102.025H73.9177Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M100.444 102.025V122.676H117.055V117.914H105.851V114.459H115.923V110.243H105.851V106.944H117.055V102.025H100.444Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M167.389 102.025V122.676H184V117.914H172.796V114.459H182.868V110.243H172.796V106.944H184V102.025H167.389Z" fill="#667085"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M123.165 102.415V122.774H127.966V114.752H130.719L134.935 122.774H141.122L136.945 114.068C142.376 110.812 141.301 103.997 135.247 102.415H123.165ZM127.869 107.334H133.412C135.338 107.334 135.213 110.321 133.412 110.321H127.869V107.334Z" fill="#667085"/>
                            <path d="M144.008 119.923C144.221 121.199 149.253 123.61 154.22 123.61C158.781 123.61 162.446 121.42 162.446 117.074C162.446 111.728 156.206 110.491 156.206 110.491C156.206 110.491 151.021 110.418 150.887 108.009C150.824 106.875 152.403 106.236 153.795 106.236C156.072 106.236 158.617 108.505 158.617 108.505L162.234 104.605C162.234 104.605 157.657 100.988 153.795 100.988C150.106 100.988 144.859 103.404 144.859 108.434C144.859 112.714 150.932 114.683 150.932 114.683C150.932 114.683 157.34 115.365 157.34 117.37C157.34 118.733 155.017 119.143 153.653 119.143C150.342 119.143 147.554 116.235 147.554 116.235L144.008 119.923Z" fill="#667085"/>
                        </svg>
                    </div>
                </div>
            </section>
            <section className="w-category py-5 text-center">
                <div className="container">
                    <div className="title mb-4">
                        <h2>Danh Mục Sản Phẩm</h2>                     
                    </div>
                    <div className="list">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-6">
                                    <a href="" className="item mb-3">
                                        <div className="bg-item img-wrap">
                                            <img src="https://source.unsplash.com/random/3" alt="" />
                                            <span>Giày nam</span>
                                        </div>      
                                    </a>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <a href="" className="item mb-3">
                                        <div className="bg-item img-wrap">
                                            <img src="https://source.unsplash.com/random/3" alt="" />
                                            <span>Tất cả sản phẩm</span>
                                        </div>      
                                    </a>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <a href="" className="item mb-3">
                                        <div className="bg-item img-wrap">
                                            <img src="https://source.unsplash.com/random/3" alt="" />
                                            <span>Giày nữ</span>
                                        </div>      
                                    </a>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        </MainLayout>       
     );
}

export default Home;