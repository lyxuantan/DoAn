import {useState, useEffect} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import {SeverityPill} from '../severity-pill';
import {
    Button,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Tooltip, Stack, Pagination
} from "@mui/material";
import {customerOrderDetailsAll} from "../../api/admin";
import {flattenDeep} from "lodash";
import {thousandsSeparators} from "../../common/fCommon";
import moment from "moment";

export const OrderListResults = ({...rest}) => {
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(5);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCustomerOrder();
    }, []);

    const fetchCustomerOrder = () => {
        customerOrderDetailsAll().then(
            res => {
                const {data} = res.data;
                if (data && data.length) {
                    const listOrderFlatten = data && data.length
                        ? flattenDeep(data.map((item) => item.customerOrderDetails.map(detail => ({
                            ...detail,
                            orderId: item
                        })))).map((i) => ({
                            ...i,
                        }))
                        : [];
                    setListOrderDetail(listOrderFlatten);
                    setTotalPages(Math.ceil(listOrderFlatten && listOrderFlatten?.length / limit));
                }
            }
        ).catch()

    }

    function handleChange(e, value) {
        setPageNo(value);
    }

    // const changStatus = (id, title, brand, image, price, saleOff, status) => {
    //     axios.put(`http://localhost:3004/products` + `/` + id, {
    //         title: title,
    //         brand: brand,
    //         image: image,
    //         price: price,
    //         saleOff: saleOff,
    //         status: !status
    //     })
    //         .then(() => {
    //             fetchProduct()
    //             // console.log(status);
    //         })
    // };

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{minWidth: "100%"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Mã đặt hàng</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Mã đơn hàng</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Tên Sản Phẩm</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Số Lượng</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Thành Tiền</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Thời gian</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOrderDetail && listOrderDetail.length ? listOrderDetail.slice(
                                (pageNo - 1) * limit,
                                (pageNo - 1) * limit + limit
                            ).map((order) => (
                                <TableRow hover key={order.id}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <Typography color="textPrimary" variant="body1">
                                                {order?.orderId?.id}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{order?.id}</TableCell>
                                    <TableCell>{order?.product?.name}</TableCell>
                                    <TableCell>
                                        {thousandsSeparators(order?.quantity)}
                                    </TableCell>
                                    <TableCell>
                                        {thousandsSeparators(order?.price)} VNĐ
                                    </TableCell>
                                    <TableCell>
                                        {moment(order?.updateTime).format("DD/MM/YYYY")}
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <div className="pagination-footer">
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={pageNo} variant="outlined" color="primary"
                                onChange={handleChange}/>
                </Stack>
            </div>
        </Card>
    );
};

OrderListResults.propTypes = {
    customers: PropTypes.array.isRequired,
};
