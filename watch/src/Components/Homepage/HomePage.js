import Header from '../Header/header';
import Infor from '../InforHeader/infor-header';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import ManBestSeller from './ManBestSeller';
import WomanBestSeller from './WomanBestSeller';
import Decripsiton from '../DecripstionWebsite';
import {useEffect, useState} from "react";
import {getAllCategory} from "../../api/category";
import HomePageBestSeller from "./HomePageBestSeller";
import HomeContentBestSell from "./HomeContentBestSell";
import {Route, Routes} from "react-router-dom";

function HomePage() {

    return (
        <>
            <Navbar/>
            <Header/>
            <Infor/>
            <HomeContentBestSell/>
            <Decripsiton/>
            <Footer/>
        </>
    )
}

export default HomePage;