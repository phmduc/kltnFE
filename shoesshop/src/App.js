import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home.js";
import ProductDetail from './pages/productDetail/productDetail.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './pages/Products/Products.js';
import Login from './pages/Login/Login.js';
import { useSelector  } from "react-redux";

function App() {
   const user = useSelector((state)=>state.userInfo)
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/'> 
                    <Route index element={<Home {...user} />}/>
                    {(!user.ID) ? <Route path='/users/login' element={<Login/>}/> : <Route path='/users/login' element={<Home/>}/>   }    
                    <Route path='/products/' >
                        <Route index element={<Products/>}/>
                        <Route path=':id' element={<ProductDetail/>}/> 
                    </Route>                   
                </Route>   
            </Routes>
        </BrowserRouter>
    );
}

export default App;