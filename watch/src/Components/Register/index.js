import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import Navbar from "../Navbar/navbar";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import './styles.scss';
import {registerApi} from "../../api/auth";
import {toast} from "react-toastify";

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

const validate = (values) => {
    const errors = {};
    if (!values?.fullName) {
        errors.fullName = "Không được để trống";
    }
    if (!values?.username) {
        errors.username = "Không được để trông";
    }
    if (!values?.password) {
        errors.password = "Không được để trông";
    }
    if (!values?.rePassword) {
        errors.rePassword = "Không được để trông";
    }
    if (!values?.address) {
        errors.address = "Không được để trông";
    }
    if (!values?.email) {
        errors.email = "Không được để trông";
    }
    if (!values?.phoneNumber) {
        errors.phoneNumber = "Không được để trông";
    }
}

export default function SignUp() {

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        rePassword: "",
        address: "",
        email: "",
        phoneNumber: "",
        role: ["user"]
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        registerApi({
            ...user,
            fullName: user.fullName,
            username: user.username,
            password: user.password,
            rePassword: user.rePassword,
            address: user.address,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role
        }).then(res => {
            const {data} = res;
            if (data) {
                if (res.status === 200) {
                    toast.success("Đăng ký thành công!");
                    clearForm();
                } else {
                    toast.error("Thất bại!")
                }
            }
        })
    };

    const clearForm = () => {
        setUser({
            fullName: "",
            username: "",
            password: "",
            rePassword: "",
            address: "",
            email: "",
            phoneNumber: "",
            role: ["user"]
        })
    }

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

    function onChangeAddress(value) {
        const tmp = {...user};
        tmp.address = value;
        setUser(tmp);
    }

    function onChangePhoneNumber(value) {
        const tmp = {...user};
        tmp.phoneNumber = value;
        setUser(tmp);
    }

    return (
        <>
            <Navbar/>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        className="register"
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng Ký
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
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
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => onChangeEmail(e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"
                                        onChange={(e) => onChangeAddress(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PhoneInput
                                        specialLabel={''}
                                        country={'vn'}
                                        width={"100%"}
                                        value={user.phoneNumber}
                                        onChange={(value) => onChangePhoneNumber(value)}
                                        // inputStyle={{
                                        //     borderColor: (props.touched && props.error) && "red"
                                        // }}
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
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                ĐĂNG KÝ
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login">
                                        <span>Bạn đã có tài khoản?</span> <span>Đăng nhập</span>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 5}}/>
                </Container>
            </ThemeProvider>
        </>
    );
}
