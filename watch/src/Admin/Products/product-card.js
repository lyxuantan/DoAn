import {useState, useEffect} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
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
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent, Pagination, Modal, Stack,
} from "@mui/material";
import {getProduct} from "../../api/product";
import {thousandsSeparators} from "../../common/fCommon";
import * as React from 'react';
import {UploadFile} from "@mui/icons-material";
import UploadFiles from "./UploadFile";
import {useNavigate} from "react-router-dom";
import './styles.scss'
import {deleteCustomerOrder} from "../../api/customer-order";
import {toast} from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: "8px",
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: "12px",
};

export const ProductCard = ({keyword}) => {
    const [limit, setLimit] = useState(5);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [img, setImg] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogBrand, setDialogBrand] = useState("");


    const [data, setData] = useState([]);
    const [productIsUpload, setProductIsUpload] = useState("");
    const navigate = useNavigate();

    const onFetchProduct = () => {
        fetchProduct();
    }

    const fetchProduct = () => {
        getProduct(
            {
                "direction": "DESC",
                "pageNo": pageNo,
                "orderBy": "product_id",
                "keyword": keyword || "",
                "pageSize": limit,
                "isBestSell": true,
                "parentCategoryId": "",

            })
            .then(res => {
                if (res && res.data) {
                    const {data} = res.data;
                    setData(data.content)
                    setTotalPages(data?.totalPages)
                }
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
      fetchProduct();
    }, [pageNo, keyword]);


    function handleClickOpen(img, title, brand) {
        setImg(img);
        setDialogTitle(title);
        setDialogBrand(brand);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPageNo(0);
    };

    const handlePageChange = (event, newPage) => {
        setPageNo(newPage);
    };

    const handleChange = (e, value) => {
        setPageNo(value);
    }

    const onShowUploadFile = (product) => {
        setProductIsUpload(product);
    }

    const handleCloseUpload = () => {
        setProductIsUpload("");
    }

    const onModifiledProduct = (product) => {
        navigate(`/admin/product/addProduct/${product.id}`)
    }

    const onCloseUpload = () => {

    }

    const onDelete = (customer) => {
        deleteCustomerOrder(
            {
                id: customer?.id,
            }
        ).then(
            res => {
                const {data} = res;
                if(data.errorCode == "200") {
                    toast.success("Xóa Thành Công")
                    fetchProduct();
                }
                else {
                    toast.error("Xóa Thất Bại")
                }
            }
        )
    }

    const title = [
        "ID",
        "Tên sản phẩm",
        "Thương hiệu",
        "Hình ảnh",
        "Giá thành",
        "Biến động giá",
        "Số lượng",
        "Tuỳ chọn",
    ];

    return (
        <Card className="list-product">
            <PerfectScrollbar>
                <Box sx={{minWidth: "100%"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"></TableCell>
                                {title.map((head, index) => (
                                    <TableCell sx={{textAlign: "center"}} key={index}>
                                        {head}
                                    </TableCell>
                                ))}
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
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer?.collections?.name}</TableCell>
                                    <TableCell>
                                        {customer.productImages.find(item => item.isPresident === true)?.photosImagePath ? <img
                                            onClick={() => handleClickOpen(customer.image, customer.title, customer.brand)}
                                            style={{
                                                width: "10rem",
                                                height: "10rem",
                                                cursor: "pointer",
                                            }}
                                            src={customer.productImages.find(item => item.isPresident === true)?.photosImagePath}
                                            alt="Lỗi hiển thị"
                                        /> : null}
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {customer.name}
                                            </DialogTitle>
                                            <DialogContent>
                                                <img
                                                    src={customer.productImages.find(item => item.isPresident === true)?.photosImagePath}
                                                    style={{width: "100%"}}
                                                    alt="error"
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Close</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>
                                        {thousandsSeparators(customer.priceRef)} VNĐ
                                    </TableCell>
                                    <TableCell>{customer.perDiscount}%</TableCell>
                                    <TableCell>{customer.total}</TableCell>
                                    <TableCell>
                                        <div className="product-action">
                                            <div>
                                                <Tooltip title="Sửa">
                                                    <Button variant="contained">
                                                        <ModeEditIcon onClick={() => onModifiledProduct(customer)}/>
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="Xoá">
                                                    <Button variant="contained" color="error">
                                                        <DeleteIcon onClick={() => onDelete(customer)}/>
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="Upload Image">
                                                    <Button variant="contained" color="success">
                                                        <UploadFile onClick={() => onShowUploadFile(customer)}/>
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
                <Pagination count={totalPages} page={pageNo} variant="outlined" color="primary" onChange={handleChange} />
            </Stack>
            </div>
            <Modal
                open={!!productIsUpload.id}
                onClose={handleCloseUpload}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="product-upload">
                    <UploadFiles data={data} productIsUpload={productIsUpload} isPresident={true} onFetchProduct={onFetchProduct} handleCloseUpload={handleCloseUpload} />
                </Box>
            </Modal>
        </Card>
    );
};
ProductCard.propTypes = {
    customers: PropTypes.array.isRequired,
};
