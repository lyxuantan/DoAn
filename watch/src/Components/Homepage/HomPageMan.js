import Header from '../Header/header';
import Infor from '../InforHeader/infor-header';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import ContentMen from './Content/contentMen';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FilterProduct from "./FilterProduct";
import {getCategoryDetail} from "../../api/category";




function HomePageMan () {

    const {id} = useParams();

    const [categoryDetail, setCategoryDetail] = useState(null)

    useEffect(() => {
        getCategoryDetail({
            id: id
        }).then(res => {
            const {data} = res.data;
            if(data) {
                console.log(26, data);
                setCategoryDetail(data);
            }
        })
    }, [id])

    console.log(categoryDetail)

    return(
        <>  
            <Navbar />
            <Header />
            <ContentMen categoryDetail={categoryDetail}/>
            <Footer />
        </>
    )
}
export default HomePageMan;