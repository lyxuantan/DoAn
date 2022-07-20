import {DashboardLayout} from "../Dashboards/DashboardLayout";
import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel, Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";
import {DashboardSidebar} from "../Dashboards/DashboardSidebar";
import {DashboardNavbar} from "../Dashboards/DashboardNavbar";
import {useParams} from "react-router-dom";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import NumberFormat, {InputAttributes} from 'react-number-format';


function AddProduct(props) {
    AddProduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

    const {id} = useParams();

    const [product, setProduct] = useState({
        "name": "",
        "title": "",
        "desc": "",
        "priceRef": 0,
        "perDiscount": 0,
        "content": "",
        "categoryId": null,
        "colorId": null,
        "materialId": null,
        "total": 0,
        "sizeId": null,
        "collectionId": null
    })


    const headerField = (num, text) => {
        return <div className="d-flex flex-row"><span>{num}</span><h5>{text}</h5></div>
    }


    const onChangeName = () => {
    }

    function onChangeTitle() {
        return undefined;
    }

    function onChangeTitle() {
        return undefined;
    }

    function onChangeDescription() {
        return undefined;
    }

    function onChangeContent() {
        return undefined;
    }

    function handleChangeCollection() {

    }

    function handleChangeColor() {

    }

    function handleChangePriceRef() {

    }

    function handleChangePerDiscount() {

    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="dashBoardNarBar">
                    <DashboardNavbar/>
                </div>
                <DashboardSidebar/>
                <div className="wrapper-AdminHome">
                    <div className="m-3">
                        <Box className=""
                             component="main"
                             sx={{
                                 flexGrow: 1,
                                 py: 8,
                                 backgroundColor: '#f9fafc'
                             }}
                        >

                            {!id ? <h2>Thêm sản phẩm</h2> : <h2>Cập nhật sản phẩm</h2>}

                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                <Grid item xs={6}>
                                    {headerField(1, "Nhập tên sản phẩm")}
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Nhập tên sản phẩm"
                                        fullWidth={true}
                                        multiline
                                        value={product.name}
                                        onChange={(e) => onChangeName()}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {headerField(2, "Nhập tiêu đề")}
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Nhập tiêu đề"
                                        fullWidth={true}
                                        multiline
                                        value={product.title}
                                        onChange={(e) => onChangeTitle()}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {headerField(2, "Nhập mô tả")}
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Nhập mô tả"
                                        fullWidth={true}
                                        multiline
                                        value={product.desc}
                                        onChange={(e) => onChangeDescription()}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {headerField(2, "Nhập nội dung")}
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Nhập nội dung"
                                        fullWidth={true}
                                        multiline
                                        value={product.desc}
                                        onChange={(e) => onChangeContent()}
                                    />
                                </Grid>


                                <Grid item xs={6}>
                                    {headerField(3, "Chọn bộ sưu tập")}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Bộ sưu tập</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={product.collectionId}
                                            label="Age"
                                            onChange={handleChangeCollection}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    {headerField(3, "Chọn Màu sắc")}
                                    <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={product.colorId}
                                        label="Age"
                                        onChange={handleChangeColor}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    {headerField(3, "Chọn kích cỡ")}

                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                                    </RadioGroup>

                                </Grid>
                                <Grid item xs={6}>
                                    {headerField(3, "Nhập giá")}
                                    <TextField
                                        label="react-number-format"
                                        value={product.priceRef}
                                        onChange={handleChangePriceRef}
                                        name="numberformat"
                                        id="formatted-numberformat-input"

                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {headerField(3, "Nhập giá")}
                                    <TextField
                                        label="react-number-format"
                                        value={product.perDiscount}
                                        onChange={handleChangePerDiscount}
                                        name="numberformat"
                                        id="formatted-numberformat-input"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                </Grid>
                            </Grid>


                        </Box>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
};
export default AddProduct;
