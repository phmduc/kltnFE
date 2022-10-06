import MainLayout from "../../layouts/MainLayout/MainLayout";
import { Fragment } from "react";
import { useEffect } from "react";

import "./Home.scss"
import { useSelector  } from "react-redux";

function Home() {

   const user = useSelector((state)=>state.userInfo)
   useEffect(()=>
   {},[user])
   console.log(user)
    return ( 
        <MainLayout>
            <div className="cac"> 
                <p>{user.name}</p>
            </div>       
        </MainLayout>       
     );
}

export default Home;