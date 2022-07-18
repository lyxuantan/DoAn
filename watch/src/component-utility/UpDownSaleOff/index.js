import React from 'react'
import './styles.scss'
import {thousandsSeparators} from "../../common/fCommon";

function UpDownSaleOff({num}) {
    return <span className={`saleOff ${num < 0 ? "down" : "up"}`}>{thousandsSeparators(num || 0)}%</span>
}

export default UpDownSaleOff;