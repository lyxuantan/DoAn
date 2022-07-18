import React, {useEffect, useState} from "react";
import {FILTER_TYPE} from "../../../../common/common";
import {getCollections, getColor, getSizes} from "../../../../api/filter";
import './styles.scss'
import imgChoice from "../../../Navbar/imgChoice";

const FilterContentList = ({type}) => {

    const [listFilter, setListFiler] = useState([]);

    useEffect(() => {
        switch (type) {
            case FILTER_TYPE.COLLECTION:
                getCollections().then(res => {
                    const {data} = res.data;
                    if (data && data.length) {
                        setListFiler(data)
                    }
                })
                return;
            case FILTER_TYPE.COLOR:
                getColor().then(res => {
                    const {data} = res.data;
                    if (data && data.length) {
                        setListFiler(data)
                    }
                })
                return;
            case FILTER_TYPE.SIZE:
                getSizes().then(res => {
                    const {data} = res.data;
                    if (data && data.length) {
                        setListFiler(data)
                    }
                })
                return;
            default:
                return;
        }
    }, [type])

    const renderFilter = (type) => {
        switch (type) {
            case FILTER_TYPE.COLLECTION:
                return <>
                    {listFilter && listFilter.length ? listFilter.map(item => <div>
                        <div>
                            <img className="imgChoice" src={imgChoice[0].img} alt=""/>
                        </div>
                        <div>
                            {item.name}
                        </div>
                    </div>) : <div>Không có dữ liệu hiển thị</div>}
                </>
            case FILTER_TYPE.COLOR:
                return <>
                    {listFilter && listFilter.length ? listFilter.map(item => <div>
                        <div className="color">
                            <div className="border">
                                <div className="label" style={{background: `${item.hex}`}}/>
                            </div>
                        </div>
                        <div>
                            {item.name}
                        </div>
                    </div>) : <div>Không có dữ liệu hiển thị</div>}
                </>
            case FILTER_TYPE.SIZE:
                return <>
                    {listFilter && listFilter.length ? listFilter.map(item => <div>
                        <div className="size">
                            <div className="label">{item.name}</div>
                        </div>
                        <div>
                            {item.name}
                        </div>

                    </div>) : <div>Không có dữ liệu hiển thị</div>}
                </>

        }
    }

    return <div className="content-list">
        {renderFilter(type)}
    </div>
}
export default FilterContentList;