import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header.js";
import Home from "./pages/Home/Home.js";
import ProductDetail from './pages/productDetail/productDetail.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './pages/Products/Products.js';
import Login from './pages/Login/Login.js';

function App() {
   
    return ( 
        <BrowserRouter>
            <Routes>
                    <Route path='/'> 
                        <Route index element={<Home/>}></Route> 
                        <Route path='/users/login' element={<Login/>}> </Route>      
                        <Route path='/products' element={<Products/>}></Route>      
                        <Route path='/products/:id' element={<ProductDetail/>}></Route>  
                    </Route>   
                    
            </Routes>
        </BrowserRouter>
    );
}

export default App;