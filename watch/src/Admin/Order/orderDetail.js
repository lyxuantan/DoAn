import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { SeverityPill } from '../severity-pill';
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
  Tooltip
} from "@mui/material";

export const OrderListResults = ({ ...rest }) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axios
    .get(`http://localhost:3004/products`)
    .then((res) => {
      const persons = res.data;
      setData(persons);
    })
    .catch((error) => console.log(error));
  }

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const changStatus = (id, title, brand, image, price, saleOff, status) => {
    axios.put(`http://localhost:3004/products` + `/` + id, {
      title: title,
      brand: brand,
      image: image,
      price: price,
      saleOff: saleOff,
      status: !status
   })
   .then(() => {
    fetchProduct()
    // console.log(status);
  })};

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã Đơn</TableCell>
                <TableCell>Mã sản phẩm</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell>Tuỳ Chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length && data?.slice(page * limit, page * limit + limit).map((customer) => (
                <TableRow hover key={customer.id}>
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
                  <TableCell>{customer.price}</TableCell>
                  <TableCell>{customer.title}</TableCell>
                  <TableCell>{customer.brand}</TableCell>
                  <TableCell
                  onClick={() => changStatus(customer.id, customer.title,
                  customer.brand, customer.image, customer.price,
                  customer.saleOff, customer.status)} >
                     
                      <SeverityPill
                       sx={{ cursor: 'pointer'}}
                      color={`${customer.status ? "success" : "warning"}`}>
                      {`${customer.status ? "Đã xuất kho" : "Đang xử lý"}`}
                    </SeverityPill>
                    
                 
                  
                </TableCell>
                  <TableCell>                      
                        <div>
                          <Tooltip title="Xoá">
                            <Button variant="contained" color="error">
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                        </div>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={limit}
      />
    </Card>
  );
};

OrderListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
