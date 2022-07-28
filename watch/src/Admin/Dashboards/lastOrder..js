import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader, Pagination, Stack,
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

const orders = [
    {
        id: 1,
        ref: 'CDD1049',
        amount: 30.5,
        customer: {
            name: 'Ekaterina Tankova'
        },
        createdAt: 1555016400000,
        status: 'pending'
    },
    {
        id: 2,
        ref: 'CDD1048',
        amount: 25.1,
        customer: {
            name: 'Cao Yu'
        },
        createdAt: 1555016400000,
        status: 'delivered'
    },
    {
        id: 3,
        ref: 'CDD1047',
        amount: 10.99,
        customer: {
            name: 'Alexa Richardson'
        },
        createdAt: 1554930000000,
        status: 'refunded'
    },
    {
        id: 4,
        ref: 'CDD1046',
        amount: 96.43,
        customer: {
            name: 'Anje Keizer'
        },
        createdAt: 1554757200000,
        status: 'pending'
    },
    {
        id: 5,
        ref: 'CDD1045',
        amount: 32.54,
        customer: {
            name: 'Clarke Gillebert'
        },
        createdAt: 1554670800000,
        status: 'delivered'
    },
    {
        id: 6,
        ref: 'CDD1044',
        amount: 16.76,
        customer: {
            name: 'Adam Denisov'
        },
        createdAt: 1554670800000,
        status: 'delivered'
    }
];


const LatestOrders = ({listOrderHistory}) => {

    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(10);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    function handleChange(e, value) {
        setPageNo(value);
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
                                            color={(order?.status === 'delivered' && 'success')
                                                || (order?.status === 'refunded' && 'error')
                                                || 'warning'}
                                        >
                                            {order?.status}
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
}

export default LatestOrders;
