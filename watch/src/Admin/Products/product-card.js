import axios from "axios";
import { useState, useEffect } from "react";
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
  DialogContent, Pagination,
} from "@mui/material";
import {getProduct} from "../../api/product";
import {thousandsSeparators} from "../../common/fCommon";
import * as React from 'react';

export const ProductCard = ({ ...rest }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogBrand, setDialogBrand] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getProduct(
        {
          "direction": "DESC",
          "pageNo": page,
          "orderBy": "product_id",
          "keyword": "",
          "pageSize": limit,
          "isBestSell": true,
          "parentCategoryId": "",

        })
        .then(res => {
          if (res && res.data) {
            const {data} = res.data;
            setData(data.content)
            setTotalPage(data?.totalPages)
          }
        })
        .catch(error => console.log(error));
  }, [page, keyword]);



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
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (e, value) => {
    console.log(85, value)
    setPage(value);
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
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {title.map((head, index) => (
                  <TableCell sx={{ textAlign: "center" }} key={index}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length && data.map((customer) => (
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
                      <img
                        onClick={() => handleClickOpen(customer.image, customer.title, customer.brand)}
                        style={{
                          width: "10rem",
                          height: "10rem",
                          cursor: "pointer",
                        }}
                        src={customer.image}
                        alt="error"
                      />
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {dialogTitle} - {dialogBrand}
                        </DialogTitle>
                        <DialogContent>
                          <img
                            src={img}
                            style={{ width: "100%" }}
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
                      {/*{customer.price.toLocaleString("vi", {*/}
                      {/*  style: "currency",*/}
                      {/*  currency: "VND",*/}
                      {/*})}*/}
                    </TableCell>
                    <TableCell>{customer.perDiscount}%</TableCell>
                    <TableCell>{customer.total}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex" }}>
                        <div style={{ paddingRight: "5px" }}>
                          <Tooltip title="Sửa">
                            <Button variant="contained">
                              <ModeEditIcon />
                            </Button>
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title="Xoá">
                            <Button variant="contained" color="error">
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
      {/*<TablePagination*/}
      {/*  rowsPerPageOptions={[5, 10]}*/}
      {/*  component="div"*/}
      {/*  count={data.length}*/}
      {/*  onPageChange={handlePageChange}*/}
      {/*  onRowsPerPageChange={handleChangeRowsPerPage}*/}
      {/*  page={page}*/}
      {/*  rowsPerPage={limit}*/}
      {/*/>*/}
    </Card>
  );
};
ProductCard.propTypes = {
  customers: PropTypes.array.isRequired,
};
