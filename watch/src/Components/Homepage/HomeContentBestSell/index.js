import React from 'react';
import ManBestSeller from "../ManBestSeller";
import {useSelector} from "react-redux";

function HomeContentBestSell() {

    const listCategory = useSelector(state => state.categorySlice?.listCategory)

    return (
        <>
            {listCategory && listCategory.length ? listCategory.map(cat =>
                <ManBestSeller key={cat.id} category={cat}/>
            ) : null}
        </>
    )
}

export default HomeContentBestSell;