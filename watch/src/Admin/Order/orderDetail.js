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
    Tooltip, Stack, Pagination, TextField, InputAdornment, SvgIcon, Modal
} from "@mui/material";
import {customerOrderDetailsAll} from "../../api/admin";
import {flattenDeep} from "lodash";
import {findText, thousandsSeparators} from "../../common/fCommon";
import moment from "moment";
import {deleteOrderHistory, getOrderHistory, updateStatusOrder} from "../../api/order-hitory";
import {Search as SearchIcon} from "../icons/search";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {UploadFile} from "@mui/icons-material";
import {deleteProduct} from "../../api/customer-order";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const OrderListResults = () => {
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(5);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState("");
    const navigator = useNavigate();


    useEffect(() => {
        fetchCustomerOrder();
    }, [keyword, pageNo]);

    const fetchCustomerOrder = () => {
        getOrderHistory().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setListOrderDetail(data);
                const dataByKeyword = data.filter(item => keyword ? (findText(item?.customerOrder?.user?.fullName, keyword)) : item);
                setTotalPages(Math.ceil(dataByKeyword && dataByKeyword.length / limit));
            }
        })
    }

    useEffect(() => {
        if(keyword) {
            setPageNo(1);
        }
    }, [keyword]);

    function handleChange(e, value) {
        setPageNo(value);
    }

    function onChangeStatus(order) {
        updateStatusOrder({
            id: order.id,
            status: !order.status
        }).then(res => {
            const {data} = res;
            if (data.errorCode == "200") {
                fetchCustomerOrder()
            }
        })
    }

    function onChangeSearch(value) {
        setKeyword(value)
    }


    const [orderDeleteSelected, setOrderDeleteSelected] = useState("")

    function onDeleteProduct(customer) {
        setOrderDeleteSelected(customer.id);
    }

    const handleCloseDelete = () => {
        setOrderDeleteSelected(null);

    }

    function onDelete() {
        deleteOrderHistory(
            {
                id: orderDeleteSelected,
            }
        ).then(
            res => {
                const {data} = res;
                if(data.errorCode == "200") {
                    toast.success("Xóa Thành Công")
                    handleCloseDelete();
                    fetchCustomerOrder();

                }
                else {
                    toast.error("Xóa Thất Bại")
                }
            }
        )
    }

    function onViewCustomerOrder(order) {
        if(order?.customerOrder?.id) {
            navigator(`/admin-order-details/${order?.customerOrder?.id}`)
        }
    }

    return (
        <>
            <div style={{paddingBottom: "16px"}}>
            <TextField
                label={"Tên Khách Hàng"}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SvgIcon
                                fontSize="small"
                                color="action"
                            >
                                <SearchIcon />
                            </SvgIcon>
                        </InputAdornment>
                    )
                }}
                placeholder="Tên Khách Hàng"
                value={keyword}
                onChange={(e) => onChangeSearch(e.target.value)}
                // variant="outlined"
            />
            </div>
            <Card>

                <PerfectScrollbar>

                    <Box sx={{minWidth: "100%"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Mã đơn hàng
                                    </TableCell>
                                    <TableCell>
                                        Tên khách hàng
                                    </TableCell>
                                    <TableCell>
                                        Trạng thái
                                    </TableCell>
                                    <TableCell sortDirection="desc">
                                        {/*<Tooltip*/}
                                        {/*    enterDelay={300}*/}
                                        {/*    title="Sort"*/}
                                        {/*>*/}
                                        {/*    <TableSortLabel*/}
                                        {/*        active*/}
                                        {/*        direction="desc"*/}
                                        {/*    >*/}
                                        Giá trị
                                        {/*</TableSortLabel>*/}
                                        {/*</Tooltip>*/}
                                    </TableCell>
                                    <TableCell>
                                        Ngày ghi nhận
                                    </TableCell>
                                    <TableCell>
                                        Cập nhật cuối
                                    </TableCell>
                                    <TableCell>
                                        TUỲ CHỌN
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listOrderDetail && listOrderDetail.length ? listOrderDetail.filter(item => keyword ? (findText(item?.customerOrder?.user?.fullName, keyword)) : item).slice(
                                    (pageNo - 1) * limit,
                                    (pageNo - 1) * limit + limit
                                ).map((order) => (
                                    <TableRow
                                        hover
                                        key={order?.id}
                                        onClick={() => onViewCustomerOrder(order)}
                                    >
                                        <TableCell>
                                            {order?.id}
                                        </TableCell>
                                        <TableCell>
                                            {order?.customerOrder?.user?.fullName}
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill
                                                style={{cursor: "pointer"}}
                                                color={order?.status ? "success" : "error"}
                                                // color={(order?.status === 'delivered' && 'success')
                                                //     || (order?.status === 'refunded' && 'error')
                                                //     || 'warning'}
                                                onClick={() => onChangeStatus(order)}
                                            >
                                                {order?.status ? "Đã giao" : "Đang giao"}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            {thousandsSeparators(order?.customerOrder?.price)} VNĐ
                                        </TableCell>
                                        <TableCell>
                                            {moment(order?.createTime).format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            {moment(order?.updateTime).format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="product-action">
                                                <div>
                                                    <Tooltip title="Xoá">
                                                        <Button variant="contained" color="error" onClick={() => onDeleteProduct(order)}>
                                                            <DeleteIcon/>
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </div>
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
            <Modal
                open={!!orderDeleteSelected}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <div className="popover-wrapper">
                        <div className="popover">
                            <div className="popover-header">
                                Xác Nhận Xóa Đơn Hàng
                            </div>
                            <div className="popover-body">
                                <Button color="primary" variant="contained" onClick={onDelete}>
                                    Xác Nhận
                                </Button>
                                <Button color="secondary" variant="contained" onClick={handleCloseDelete}>
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

OrderListResults.propTypes = {
    customers: PropTypes.array.isRequired,
};
