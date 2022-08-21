import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl, FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    useTheme
} from '@mui/material';
import React, {useEffect, useState} from "react";
import moment from "moment";
import ReactECharts from "echarts-for-react";
import {useSelector} from "react-redux";
import {thousandsSeparators} from "../../common/fCommon";
import './styles.scss'
import {getProduct} from "../../api/product";

const si = [
    {v: 1e3, s: "Nghìn"},
    {v: 1e6, s: "Triệu"},
    {v: 1e9, s: "Tỷ"},
    {v: 1e12, s: "Nghìn Tỷ"},
    {v: 1e15, s: "Triệu Tỷ"},
];

const numberToString = (num) => {
    if (num === null || num === 0 || num === undefined) return 0;
    if (num > 0) {
        if (num < 1000) {
            return thousandsSeparators(num);
        }
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].v) {
                break;
            }
        }
        return (
            (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1").replace(".", ",") + " " +
            si[i].s
        );
    } else {
        const positiveNumbers = Math.abs(num);
        if (positiveNumbers < 1000) {
            return "-" + thousandsSeparators(positiveNumbers);
        }
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (positiveNumbers >= si[i].v) {
                break;
            }
        }
        return (
            "-" + (positiveNumbers / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1").replace(".", ",") + " " +
            si[i].s
        );
    }
};

const nest = (items, id = 0, link = 'parentId') =>
    items
        .filter(item => item[link] === id)
        .map(item => ({
            ...item,
            children: nest(items, item.id)
        }));


const Chart = ({listOrderHistory, listAllProduct}) => {

    const listCategory = useSelector(state => state.categorySlice)?.listCategory;
    const [categorySelected, setCategorySelected] = useState(listCategory?.[0]?.id);
    const [listBestSeller, setListBestSeller] = useState([]);
    const [typeChart, setTypeChart] = useState({
        barChart: listCategory?.[0]?.id,
        lineChart: "month",
    })

    useEffect(() => {
        setCategorySelected(listCategory?.[0]?.id)
    }, [listCategory])

    useEffect(() => {
        getProduct({
            "direction": "DESC",
            "pageNo": 1,
            "pageSize": 5,
            "keyword": "",
            "orderBy": "sale_number",
            "isBestSell": true,
            "parentCategoryId": categorySelected,
        }).then(res => {
                if (res && res.data) {
                    const {data} = res.data;
                    setListBestSeller(data.content)
                }
            }
        )
    }, [categorySelected])

    function onChangeTypeBarChart(value) {
        setCategorySelected(value)
        // setTypeChart({...typeChart, barChart: value})
    }

    function onChangeTypeLineChart(value) {
        setTypeChart({...typeChart, lineChart: value})
    }

    return (

        <div className="chart-wrapper">
            <div className="row">
                <div className="col-6">
                    <FormControl>
                        {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={typeChart.lineChart}
                            value={typeChart.lineChart}
                            name="radio-buttons-group"
                            className="flex-row"
                        >

                            <FormControlLabel value="month" control={<Radio/>} label="Tháng"
                                              onChange={(e) => onChangeTypeLineChart(e.target.value)}/>
                            <FormControlLabel value="year" control={<Radio/>} label="Năm"
                                              onChange={(e) => onChangeTypeLineChart(e.target.value)}/>
                        </RadioGroup>
                    </FormControl>
                    <LineChart listOrderHistory={listOrderHistory} type={typeChart.lineChart}/>
                </div>
                <div className="col-6">
                    <FormControl>
                        {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={categorySelected}
                            value={categorySelected}
                            name="radio-buttons-group"
                            className="flex-row"

                        >
                            {listCategory && listCategory.length ? listCategory.map(item => (
                                <FormControlLabel value={item?.id} control={<Radio/>} label={item.name}
                                                  onChange={(e) => onChangeTypeBarChart(e.target.value)}
                                />
                            )) : null}
                        </RadioGroup>
                    </FormControl>
                    <BarChart listAllProduct={listAllProduct} listBestSeller={listBestSeller}/>
                </div>
            </div>
        </div>

    );
};

const BarChart = ({listAllProduct, listBestSeller}) => {
    // const sortBySale = listAllProduct && listAllProduct.length ? listAllProduct.sort((a, b) => b.saleNumber - a.saleNumber) : [];

    const nestListProduct = nest(listAllProduct)
    const cData = [];
    listBestSeller?.forEach((item, index) => {
        if (index < 10) {
            cData.push([item.saleNumber, `${item.name}-${index}`])
        }
    })

    const options = {
        dataset: {
            source: cData,
        },
        grid: {
            containLabel: true,
            left: "2%",
            right: "2%",
            top: 0,
            bottom: 0
        },
        xAxis: {
            axisLabel: {
                overflow: "truncate", // or 'break' to continue in a new
                rotate: 30,
                formatter: (value, index) => {
                    if (index % 2 !== 0 || index === 0) {
                        return numberToString(value);
                    }
                },
            },
        },
        yAxis: {type: "category", inverse: true}, //,  nameGap: 25
        gradientColor: "#106ce1",

        visualMap: {
            orient: "none",
            left: "-1000000",
            dimension: 1,
        },
        series: [
            {
                type: "bar",
                encode: {
                    x: "",
                    y: "",
                },
            },
        ],
        tooltip: {
            position: "bottom",
            borderColor: "white",
            textStyle: {
                color: "#2B3555",
            },
        },
    };
    return <ReactECharts option={options}/>;
};

const LineChart = ({data, listOrderHistory, type}) => {

    const resultArr = [];
    const dateArr = [];

    listOrderHistory && listOrderHistory.length && listOrderHistory?.forEach(function (res, value) {
        let date = null;
        if (type === "month") {
            date = moment(res.createTime).format("MM/YYYY");
        }
        if (type === "year") {
            date = moment(res.createTime).year();
        }
        var index = dateArr.indexOf(date);
        if (index == -1) {
            dateArr.push(date);
            var obj = {date: date, totalPrice: res?.customerOrder?.price || 0, total: res?.customerOrder?.total || 0};
            resultArr.push(obj);
        } else {
            resultArr[index].totalPrice += res?.customerOrder?.price || 0;
            resultArr[index].quantity += res?.customerOrder?.total || 0;
        }
    }, {});

    let labels = resultArr && resultArr.length ? resultArr.map(item => item.date) : [];
    const cData = [
        {
            name: "Doanh Thu",
            data: resultArr && resultArr.length ? resultArr.map(item => item.totalPrice) : [],
            type: 'line',
            smooth: true
        },
        {
            name: "Tổng số",
            data: resultArr && resultArr.length ? resultArr.map(item => item.total) : [],
            type: 'line',
            smooth: true
        }
    ];

    const options = {
        tooltip: {
            trigger: "axis",
            formatter: function (a) {
                return `
            <div style="padding: 5px;">
            <div>${a?.[0]?.name}</div>
            <div class="d-flex justify-content-between"><strong>Doanh Thu</strong>&nbsp<span>${numberToString(a?.[0]?.value)}</span></div>
            <div class="d-flex justify-content-between"><strong>Tổng Số</strong>&nbsp<span>${thousandsSeparators(a?.[1]?.value)}</span></div>
            </div>
                `;
            },

        },
        grid: {
            top: "10%",
            left: "10%",
            // top: 0,
            bottom: 0,
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: labels,
            axisLabel: {
                overflow: "truncate", // or 'break' to continue in a new
                rotate: 40,
            },
        },
        yAxis: [
            {
                type: "value",
                axisLabel: {
                    formatter: function (a, index) {
                        return `${numberToString(a)} VNĐ`;

                    },
                },
            },
        ],
        series: cData?.length ? cData : [],
    };
    return <ReactECharts option={options}/>;
};

export default Chart;
