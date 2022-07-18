import {useState, useEffect} from "react";
import './content.css';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import FilterProduct from "../FilterProduct";
import {getProduct} from "../../../api/product";
import ProductItem from "../productItem";
import React from "react";

function ContentMen({categoryDetail}) {

    const {id} = useParams();

    const [data, setData] = useState([]);
    const [page, setPage] = useState({

    })


    useEffect(() => {
        getProduct(
            {
                "id": 15,
                "colors": [],
                "material": [],
                "size": [],
                "collections": [],
                "priceFrom": 400000,
                "priceTo": 10000000000,
                "categoryId": categoryDetail?.id,
                "direction": "DESC",
                "pageNo": 1,
                "pageSize": 4,
                "orderBy": "sale_number",
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
    }, [categoryDetail]);


    return (
        <>
            <FilterProduct categoryDetail={categoryDetail}/>

            <div className="product-container">
                {data && data.length ? data.map((item) =>
                        (<ProductItem key={item.id} item={item}/>))
                    : null}
            </div>
        </>
    );
}

export default ContentMen;
