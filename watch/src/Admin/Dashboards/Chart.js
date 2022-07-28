import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import moment from "moment";
import ReactECharts from "echarts-for-react";
import {thousandsSeparators} from "../../common/fCommon";
import './styles.scss'

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
    }
    else {
        const positiveNumbers = Math.abs(num);
        if (positiveNumbers < 1000) {
            return "-"+thousandsSeparators(positiveNumbers);
        }
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (positiveNumbers >= si[i].v) {
                break;
            }
        }
        return (
            "-"+(positiveNumbers / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1").replace(".", ",") + " " +
            si[i].s
        );
    }
};

const Chart = ({listOrderHistory, listAllProduct}) => {

  return (
   
   <div className="chart-wrapper">
       <div>
        <LineChart listOrderHistory={listOrderHistory} type={"month"}/>
       </div>
       <div>
           <BarChart listAllProduct={listAllProduct}/>

       </div>
    </div>
      
  );
};

const BarChart = ({ listAllProduct }) => {
    const sortBySale  = listAllProduct && listAllProduct.length ? listAllProduct.sort((a, b) => b.saleNumber - a.saleNumber) : [];
    const cData = [];
    sortBySale?.forEach((item, index) => {
        if(index < 10) {
            cData.push([item.saleNumber, item.name])
        }
    })
    // let measure = data.measures[0].name;
    const options = {
        dataset: {
            source: cData,
        },
        grid: {
            containLabel: true,
            left: "2%",
            right: "2%",
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
        yAxis: { type: "category", inverse: true }, //,  nameGap: 25

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
            // confine: true,
        //     formatter: function (a) {
        //         const { data } = a;
        //         return `
        //     <div style="padding: 0px;">
        //         <div style="white-space: nowrap;">${formatDateToDDMMYYYY(
        //             dataFilter?.value?.from
        //         )} - ${formatDateToDDMMYYYY(dataFilter?.value?.to)}</div>
        //         <div style="margin-top: 10px">
        //         <span style="white-space: nowrap">${data[1]}</span>
        //     </div>
        //     <div style="margin-top: 10px; display: flex; flex-direction: row">
        //         <div style="width: 80px; word-break: break-word !important; white-space: normal; !important;">${measure}:</div> <div><strong style="margin-left: 3px">${numberToString(
        //             data[0]
        //         )}</strong></div>
        //     </div>
        //     </div>
        // `;
        //     },
            borderColor: "white",
            textStyle: {
                color: "#2B3555",
            },
        },
    };
    return <ReactECharts  option={options} />;
};

const LineChart = ({data, listOrderHistory, type }) => {

    const resultArr = [];
    const dateArr = [];


    listOrderHistory && listOrderHistory.length && listOrderHistory?.forEach(function(res, value) {
        let date = null;
        if(type === "month") {
            date = moment(res.createTime).format("MM/YYYY");
        }
        if(type === "year") {
            date = moment(res.createTime).year();
        }
        var index = dateArr.indexOf(date);
        if (index == -1) {
            dateArr.push(date);
            var obj = {date: date, totalPrice: res?.customerOrder?.price || 0, total: res?.customerOrder?.total || 0};
            resultArr.push(obj);
        }
        else {
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

        },
        grid: {
            top: "10%",
            left: "10%",
            right: "4%",
            bottom: "10%",
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
    return <ReactECharts  option={options} />;
};

export default Chart;
