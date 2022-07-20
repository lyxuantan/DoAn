import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
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
  Tooltip
} from "@mui/material";

export const AccountListResults = ({ ...rest }) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/products`)
      .then((res) => {
        const persons = res.data;
        setData(persons);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Tài Khoản</TableCell>
                <TableCell>Mật Khẩu</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phân Quyền</TableCell>
                <TableCell>Tuỳ Chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * limit, page * limit + limit).map((customer) => (
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
                  <TableCell>{customer.title}</TableCell>
                  <TableCell>{customer.brand}</TableCell>
                  <TableCell>email@gmail.com</TableCell>
                  <TableCell>user</TableCell>
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

AccountListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
