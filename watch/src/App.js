import HomePage from './Components/Homepage/HomePage';
import DetailProduct from './Components/Homepage/DetailProduct/detailProduct';
import {Route, HashRouter, Routes, BrowserRouter} from 'react-router-dom';
import AboutUs from './Components/AboutUs/aboutUs';
import Login from './Components/Login';
import ForgotPass from './Components/ForgotPassWord';
import SignUp from './Components/Register';
import HomePageMan from './Components/Homepage/HomPageMan';
import HomePageWoman from './Components/Homepage/HomePageWoman';
import HomePageBestSeller from './Components/Homepage/HomePageBestSeller';
import Header from "./Components/Header/header";
import Navbar from "./Components/Navbar/navbar";


function App() {
    return (
        <>
                <Routes>
                    <Route path='/' name="Home" element={<HomePage/>}/>
                    <Route path='product' exact={true} name="Product" element={<HomePageMan/>}/>
                    <Route path='product/:id' exact={true} name="Product Detail" element={<HomePageMan/>}/>
                    <Route path='product/best-seller/:id' name="Product Detail"
                           element={<HomePageMan isBestSeller={true}/>}/>

                    <Route path="detail/product/:id" element = {<DetailProduct />} />
                    <Route path='aboutUs' element = { <AboutUs />} />
                    <Route path='login' element={<Login/>}/>
                    <Route path='forgot/password' element={<ForgotPass/>}/>
                    <Route path='singUp' element={<SignUp/>}/>
                    <Route path='product/men' element = { <HomePageMan />} />
                    <Route path='product/woman' element =  { <HomePageWoman />} />
                    <Route path='bestseller' element={ <HomePageBestSeller /> } />
                </Routes>

        </>
    );
}

export default App;
