import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  import { Search as SearchIcon } from "../icons/search";
  
  export const AccountListToolbar = (props) => (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Tài Khoản
        </Typography>
        <Box sx={{ m: 1 }}>
        <Typography
          sx={{ m: 1 }}
          variant="h6"
        >
          Tổng số tài khoản: 18
        </Typography>
        </Box>
        <Link to="/admin/account/addAccount">
          <Box sx={{ m: 1 }}>
            <Button color="primary" variant="contained">
              Thêm tài khoản
            </Button>
          </Box>
        </Link>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: "100%" }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Tìm kiếm tài khoản"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
  