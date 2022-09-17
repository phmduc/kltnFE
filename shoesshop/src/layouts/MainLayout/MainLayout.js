import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import { Fragment } from "react";
function MainLayout({children}) {
    return ( 
        <Fragment>
            <Header/>
                <div className="wrapper">
                    {children}
                </div>
            <Footer/>
        </Fragment>
     ) ;
}

export default MainLayout;