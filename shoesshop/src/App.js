import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header.js";
import Home from "./pages/Home/Home.js";
import Product from './pages/Product/Product.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './pages/Products/Products.js';


function App() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/products' element={<Products/>}></Route>
                <Route path='/product' element={<Product/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;