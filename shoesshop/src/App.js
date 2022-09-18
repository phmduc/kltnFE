import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header.js";
import Home from "./pages/Home/Home.js";
import ProductDetail from './pages/productDetail/productDetail.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './pages/Products/Products.js';


function App() {
    return ( 
        <BrowserRouter>
            <Routes>
                    <Route path='/'> 
                        <Route index element={<Home/>}></Route> 
                        <Route path='/products' element={<Products/>}>
                            <Route path='/products/:id' element={<ProductDetail/>}></Route>  
                        </Route>      
                    </Route>   
                    
            </Routes>
        </BrowserRouter>
    );
}

export default App;