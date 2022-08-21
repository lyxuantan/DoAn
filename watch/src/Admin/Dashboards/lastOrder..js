import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader, Modal, Pagination, Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import {SeverityPill} from '../severity-pill';
import {useState} from "react";
import {thousandsSeparators} from "../../common/fCommon";
import moment from 'moment';
import {deleteOrderHistory, updateStatusOrder} from "../../api/order-hitory";
import DeleteIcon from "@mui/icons-material/Delete";
import {toast} from "react-toastify";



const LatestOrders = ({listOrderHistory, onFetchOrderHistory}) => {

    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(10);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [orderDeleteSelected, setOrderDeleteSelected] = useState("")

    function handleChange(e, value) {
        setPageNo(value);
    }


    function onChangeStatus(order) {
        updateStatusOrder({
            id: order.id,
            status: !order.status
        }).then(res => {
            const {data} = res;
            if(data.errorCode == "200") {
                onFetchOrderHistory()
            }
        })

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
                    onFetchOrderHistory();
                    handleCloseDelete();
                }
                else {
                    toast.error("Xóa Thất Bại")
                }
            }
        )
    }

    function onDeleteOrderHistory(order) {
        setOrderDeleteSelected(order.id);

    }

    return (
        <Card>
            <CardHeader title="Latest Orders"/>
            <PerfectScrollbar>
                <Box sx={{minWidth: '100%'}}>
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
                            {listOrderHistory && listOrderHistory.length ? listOrderHistory?.slice(
                                (pageNo - 1) * limit,
                                (pageNo - 1) * limit + limit
                            ).map((order) => (
                                <TableRow
                                    hover
                                    key={order?.id}
                                >
                                    <TableCell>
                                        {order?.id}
                                    </TableCell>
                                    <TableCell>
                                        {order?.customerOrder?.user?.fullName}
                                    </TableCell>
                                    <TableCell>
                                        <SeverityPill
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
                                                    <Button variant="contained" color="error" onClick={() => onDeleteOrderHistory(order)}>
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
        </Card>
    );
}

export default LatestOrders;
