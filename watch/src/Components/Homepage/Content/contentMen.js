import {useState, useEffect} from "react";
import './content.css';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import FilterProduct from "../FilterProduct";
import {getProduct} from "../../../api/product";
import ProductItem from "../productItem";
import React from "react";

function ContentMen({categoryDetail, isBestSeller}) {

    const {id} = useParams();

    const [data, setData] = useState([]);

    const [filterProduct, setFilterProduct] = useState({
        colors: [],
        size: [],
        collections: [],
        "priceFrom": 0,
        "priceTo": 0,
    })
    const [page, setPage] = useState({

    })

    useEffect(() => {
        getProduct(
            {
                "id": 15,
                "colors": [],
                "size": [],
                "collections": [],
                "priceFrom": 400000,
                "priceTo": 10000000000,
                "categoryId": categoryDetail?.id,
                "direction": "DESC",
                "pageNo": 1,
                "pageSize": 4,
                "orderBy": `${isBestSeller ? "sale_number" : "product_id"}`,
                "isBestSell": false,
                "parentCategoryId": categoryDetail?.parentId,

            })
            .then(res => {
                if (res && res.data) {
                    const {data} = res.data;
                    setData(data.content)
                }
            })
            .catch(error => console.log(error));
    }, [categoryDetail, isBestSeller]);

    const onChangeCollection = (item) => {
        const tmp = {...filterProduct};
        const findIndex = tmp.collections.findIndex(i => i.id === item.id);
        if(findIndex > -1 ){
            tmp.size.splice(findIndex, 1);
        }
        else {
            tmp.size.push(item.id);
        }
    }

    const onChangeSize = (item) => {
        const tmp = {...filterProduct};
        const findIndex = tmp.size.findIndex(i => i.id === item.id);
        if(findIndex > -1) {
            tmp.size.splice(findIndex, 1);
        }
        else {
            tmp.size.push(item.id);
        }

    }

    const onChangeColor = (item) => {
        const tmp = {...filterProduct};
        const findIndex = tmp.size.findIndex(i => i.id === item.id);
        if(findIndex > -1) {
            tmp.size.splice(findIndex, 1);
        }
        else {
            tmp.size.push(item.id);
        }
    }

    return (
        <>
            <FilterProduct categoryDetail={categoryDetail} filterProduct={filterProduct} onChangeCollection={onChangeCollection}
                           onChangeSize={onChangeSize} onChangeColor={onChangeColor}/>

            <div className="product-container">
                {data && data.length ? data.map((item) =>
                        (<ProductItem key={item.id} item={item} />))
                    : null}
            </div>
        </>
    );
}

export default ContentMen;
