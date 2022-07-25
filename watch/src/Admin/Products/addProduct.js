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
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import NumberFormat, {InputAttributes} from 'react-number-format';
import {getCollections, getColor, getSizes} from "../../api/filter";
import './styles.scss'
import {saveProduct, updateProduct} from "../../api/product";
import {useSelector} from "react-redux";
import {getAllCategory} from "../../api/category";


function AddProduct(props) {
    AddProduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

    const {id} = useParams();
    const categoryStore = useSelector(state => state.categorySlice);

    console.log(34, categoryStore)

    const [collections, setCollections] = useState([]);
    const [listCategory , setListCategory] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
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
        "collectionId": null,
        glassSurface: "",
        thinkness: ""
    })
    const navigate = useNavigate();
    //
    useEffect(() => {
        getCollections().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setCollections(data);
            }
            console.log(data)
        })
    }, [])

    useEffect(() => {
        getSizes().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setSize(data);
            }
            console.log(data);
        })
    }, [])

    useEffect(() => {
        getColor().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setColor(data);
            }
        })
    }, [])

    useEffect(() => {
        getAllCategory().then(res => {
            const {data} = res.data;
            if(data && data.length) {
                setListCategory(data);
            }
        })
    }, [])

    const headerField = (num, text) => {
        return <div className="d-flex flex-row"><span>{num}</span><h5>{text}</h5></div>
    }


    const onChangeName = (value) => {
        const tmp = {...product};
        tmp.name = value;
        setProduct(tmp);
    }


    function onChangeTitle(value) {
        const tmp = {...product};
        tmp.title = value;
        setProduct(tmp);
    }

    function onChangeDescription(value) {
        const tmp = {...product};
        tmp.desc = value;
        setProduct(tmp);
    }

    function onChangeContent(value) {
        const tmp = {...product};
        tmp.content = value;
        setProduct(tmp);
    }

    function handleChangeCollection(value) {
        const tmp = {...product};
        tmp.collectionId = value;
        setProduct(tmp);

    }

    function handleChangeColor(value) {
        const tmp = {...product};
        tmp.colorId = value;
        setProduct(tmp);
    }

    function handleChangePriceRef(value) {
        const tmp = {...product};
        tmp.priceRef = value;
        setProduct(tmp);
    }

    function handleChangePerDiscount(value) {
        const tmp = {...product};
        tmp.perDiscount = value;
        setProduct(tmp);
    }


    function onChangeGlassSurface(value) {
        const tmp = {...product};
        tmp.glassSurface = value;
        setProduct(tmp);
    }

    function onChangeThinkness(value) {
        const tmp = {...product};
        tmp.thinkness = value;
        setProduct(tmp);
    }

    async function onSaveClick () {
        if(product.name && product.collectionId) {
            const payload = {
                ...product
            }
            const saveRes = id ? await updateProduct(payload) : await saveProduct(payload);
            console.log(saveRes)
            if(saveRes.data.errorCode == "200") {
                navigate("/admin/product");
            }
        }
    }

    function handleChangeCategory(value) {
        const tmp = {...product};
        tmp.categoryId = value;
        setProduct(tmp);
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
                        <div className="content-wrapper">
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
                                    <Grid item xs={12}>
                                        {headerField(7, "Chọn danh mục")}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Chọn danh mục</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={product.categoryId}
                                                label="Chọn danh mục"
                                                onChange={(e) => handleChangeCategory(e.target.value)}
                                            >
                                                {listCategory && listCategory.length ? listCategory.filter(i => i.parentId).map((item, index) =>
                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                ) : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(1, "Nhập tên sản phẩm")}
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Nhập tên sản phẩm"
                                            fullWidth={true}
                                            multiline
                                            value={product.name}
                                            onChange={(e) => onChangeName(e.target.value)}
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
                                            onChange={(e) => onChangeTitle(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(3, "Nhập mô tả")}
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Nhập mô tả"
                                            fullWidth={true}
                                            multiline
                                            value={product.desc}
                                            onChange={(e) => onChangeDescription(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(4, "Nhập nội dung")}
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Nhập nội dung"
                                            fullWidth={true}
                                            multiline
                                            value={product.content}
                                            onChange={(e) => onChangeContent(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(5, "Nhập chất liệu kính")}
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Nhập chất liệu kính"
                                            fullWidth={true}
                                            multiline
                                            value={product.glassSurface}
                                            onChange={(e) => onChangeGlassSurface(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(6, "Độ dày")}
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Nhập độ dày"
                                            fullWidth={true}
                                            multiline
                                            value={product.thinkness}
                                            onChange={(e) => onChangeThinkness(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(7, "Chọn bộ sưu tập")}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Bộ sưu tập</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={product.collectionId}
                                                label="Age"
                                                onChange={(e) => handleChangeCollection(e.target.value)}
                                            >
                                                {collections && collections.length ? collections.map((item, index) =>
                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                ) : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(8, "Chọn Màu sắc")}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={product?.colorId}
                                                label="Age"
                                                onChange={(e) => handleChangeColor(e.target.value)}
                                            >
                                                {color && color.length ? color.map((item, index) =>
                                                    <MenuItem value={item?.id}>{item?.name}</MenuItem>
                                                ) : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {headerField(9, "Chọn kích cỡ")}
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            {size && size.length ? size.map((item, index) =>
                                                <FormControlLabel value={item.id} control={<Radio/>} label={item.name}/>
                                            ) : null}

                                        </RadioGroup>

                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(10, "Nhập giá")}
                                        <TextField
                                            type="number"
                                            label="Giá sản phẩm"
                                            fullWidth={true}
                                            value={product.priceRef}
                                            onChange={(e) => handleChangePriceRef(e.target.value)}
                                            name="numberformat"
                                            id="outlined-multiline-flexible"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {headerField(11, "Nhập giá")}
                                        <TextField
                                            type="number"
                                            label="Giảm giá"
                                            fullWidth={true}
                                            value={product.perDiscount}
                                            onChange={(e) => handleChangePerDiscount(e.target.value)}
                                            name="numberformat"
                                            id="formatted-numberformat-input"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                   <div className="add-product-footer">
                                       <button className="btn-cancel mr-2">Hủy bỏ</button>
                                       <button className="btn-save pl-3" onClick={onSaveClick}>Lưu sản phẩm</button>
                                   </div>
                                </Grid>
                            </Box>


                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
};
export default AddProduct;
