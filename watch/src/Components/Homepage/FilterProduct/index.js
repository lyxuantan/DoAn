import React, {useRef, useState} from 'react';
import './styles.scss';
import {Chevron} from "../../../component-utility/icons-component";
import {Checkbox} from "@mui/material";
import FilterContentList from "./FilterContentList";
import {FILTER_TYPE, SORT_TYPE} from "../../../common/common";
import {useOutsideAlerter} from "../../../component-utility/hook";

const TYPE_FILTER = [
    {
        key: FILTER_TYPE.COLLECTION,
        name: "Bộ sưu tập",
        active: false,
    },
    {
        key: FILTER_TYPE.SIZE,
        name: "size",
        active: false,
    },
    {
        key: FILTER_TYPE.COLOR,
        name: "Màu sắc",
        active: false,
    },
    {
        key: "PRICE_RANGE",
        name: "Khoảng giá",
        active: false,
    }
]

const LIST_SORT = [
    {
        key: SORT_TYPE.DEFAULT,
        name: "Mặc định"
    },
    {
        key: SORT_TYPE.ASC,
        name: "Giá tăng dần"
    },
    {
        key: SORT_TYPE.DESC,
        name: "Giá giảm dần"
    }
]


const FilterProduct = ({categoryDetail}) => {

    const [filterSelected, setFilerSelected] = useState(null);
    const [isShow, setIsShow] = useState(false);

    const refFilterContent = useRef(null);
    const refFilterProperties = useRef(null);
    const refSort = useRef(null);

    useOutsideAlerter(refFilterContent, () => {
        if (isShow && filterSelected) {
            setIsShow(false);
            setFilerSelected(null);
        }
    });

    useOutsideAlerter(refFilterProperties, () => {
        if (isShow && filterSelected) {
            setIsShow(false);
            setFilerSelected(null);
        }
    });

    const onSelectFilter = (item) => {
        setFilerSelected(item);
        setIsShow(true)
    }

    return (<>
        <div className="category-header">
            <div className="header-left">
                <div>
                    {categoryDetail?.title}
                </div>
                <div>
                    {categoryDetail?.desc}
                </div>
            </div>
            <div className="header-right">
                43 trên 43 sản phẩm
            </div>
        </div>
        <div className="filter-wrapper">
            <div
                className="filter" ref={refFilterContent}>
                <div className="filter-header">
                    <div className="filter-header-properties">
                        <ul>
                            {TYPE_FILTER.map(item => <li onClick={() => onSelectFilter(item)}>
                                <div
                                    className={`filter ${filterSelected?.key === item?.key ? "active" : ""}`}>{item.name}<Chevron
                                    height={18}/></div>
                            </li>)}
                        </ul>
                    </div>
                    <div className="filter-header-sort" ref={refSort}>
                        <div className="filter"><span>Sắp xếp theo</span><Chevron height={18}/></div>
                    </div>
                </div>
                {isShow ? <div className="filter-content">
                    <div className="body">
                        <FilterContentList type={filterSelected?.key}/>
                    </div>
                    <div className="footer">
                        <div>
                            <Checkbox/> Ẩn sản phẩm hết hàng
                        </div>
                        <div>
                            46 sản phẩm phù hợp
                        </div>
                        <div className="text-decoration-underline">
                            Reset
                        </div>
                    </div>
                </div> : null}
            </div>
        </div>
    </>)
}
export default FilterProduct;