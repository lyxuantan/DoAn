import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Curno| '}
      
      Thương hiệu
      {' dành cho bạn và người thân'}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    rePassword: "",
    email: ""
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  function onChangeFullName(value) {
    const tmp = {...user};
    tmp.fullName = value;
    setUser(tmp);
  }

  function onChangeUsername(value) {
    const tmp = {...user};
    tmp.username = value;
    setUser(tmp);
  }

  function onChangePassword(value) {
    const tmp = {...user};
    tmp.password = value;
    setUser(tmp);
  }

  function onChangeEmail(value) {
    const tmp = {...user};
    tmp.email = value;
    setUser(tmp);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Họ và tên"
                  autoFocus
                  onChange={(e) => onChangeFullName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Tài khoản"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => onChangeUsername(e.target.value)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => onChangePassword(e.target.value)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Nhập lại mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => onChangeEmail(e.target.value)}

                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ĐĂNG KÝ
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}