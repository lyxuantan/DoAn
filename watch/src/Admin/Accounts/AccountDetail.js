import {useState, useEffect} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
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
import {deleteUser, getUserPage} from "../../api/user";
import {toast} from "react-toastify";

export const AccountListResults = ({keyword}) => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetUserId();
    }, [pageNo, limit, keyword])

    const fetUserId = () => {
        getUserPage(
            {
                page: pageNo,
                limit: limit,
                keyword: keyword
            }
        ).then(res => {
            const {data} = res.data;
            if (data) {
                setData(data.content);
                setTotalPages(data?.totalPages)
            }
        })
    }

    function handleChange(event, newPage) {
        setPageNo(newPage);
    }

    function onDeleteUser(customer) {
        deleteUser(
            {
                userId: customer?.id,
            }
        ).then(
            res => {
                const {data} = res;
                if (data.errorCode == "200") {
                    toast.success("Xóa Thành Công")
                } else {
                    toast.error("Xóa Thất Bại")
                }
            }
        )
    }

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{minWidth: "100%"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Tài Khoản</TableCell>
                                <TableCell>Tên</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phân Quyền</TableCell>
                                <TableCell>Tuỳ Chọn</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length ? data.map((customer) => (
                                <TableRow hover key={customer.id}>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <Typography color="textPrimary" variant="body1">
                                                {customer.id}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{customer.username}</TableCell>
                                    <TableCell>{customer.fullName}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>user</TableCell>
                                    <TableCell>
                                        <div>
                                            <Tooltip title="Xoá">
                                                <Button variant="contained" color="error">
                                                    <DeleteIcon onClick={() => onDeleteUser(customer)}/>
                                                </Button>
                                            </Tooltip>
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
    );
};

// AccountListResults.propTypes = {
//     customers: PropTypes.array.isRequired,
// };
