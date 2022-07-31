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
import {useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import NumberFormat, {InputAttributes} from 'react-number-format';
import {getCollections, getColor, getSizes} from "../../api/filter";
import './styles.scss'
import {getProductDetail, saveProduct, updateProduct} from "../../api/product";
import {useSelector} from "react-redux";
import {getAllCategory} from "../../api/category";
import DashboardTitle from "../../Components/DashboardTitle";
import {CardBackButton} from "../../component-utility/icons-component";
import CustomError from "../../component-utility/custom-error";


function AddProduct(props) {
    AddProduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

    const {id} = useParams();
    const categoryStore = useSelector(state => state.categorySlice);

    const [collections, setCollections] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [product, setProduct] = useState({
        id: null,
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

    useEffect(() => {
        getProductDetail(
            {productId: id}
        ).then(res => {
            const {data} = res.data;
            console.log(res)
            if (data) {
                const tmp = {...product};
                tmp.id = data.id;
                tmp.name = data.name;
                tmp.title = data.title;
                tmp.desc = data.desc;
                tmp.priceRef = data.priceRef;
                tmp.perDiscount = data.perDiscount;
                tmp.content = data.content;
                tmp.categoryId = data.categoryId;
                tmp.colorId = data?.colors?.id;
                tmp.materialId = data.materialId;
                tmp.total = data.total;
                tmp.sizeId = data?.size?.id;
                tmp.collectionId = data?.collections?.id;
                tmp.glassSurface = data.glassSurface;
                tmp.thinkness = data.thinkness;
                setProduct(tmp);
            }
        })
    }, [id])

    const validate = (val) => {
        const errors = {};
        if (!product?.name) {
            errors.name = "Tên Sản Phẩm Không Được Để Trống";
        }
        if (!product?.categoryId) {
            errors.categoryId = "Tên Sản Phẩm Không Được Để Trống";
        }
        if (!product?.priceRef) {
            errors.priceRef = "Giá Sản Phẩm Không Được Để Trống";
        }
        if (!product?.collectionId) {
            errors.collectionId = "Bộ Sưu Tập Không Được Để Trống";
        }
        return errors;
    }

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
            if (data && data.length) {
                setListCategory(data);
            }
        })
    }, [])

    const headerField = (num, text) => {
        return <div className="title-form d-flex flex-row"><span className="title-form-number">{num}</span><span
            className="title-form-text">{text}</span></div>
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

    async function onSaveClick() {
        setIsSaveClick(true)
        if (product.name && product.collectionId) {
            const payload = {
                ...product,
                perDiscount: product.perDiscount || 0
            }
            const saveRes = id ? await updateProduct(payload) : await saveProduct(payload);
            if (saveRes.data.errorCode == "200") {
                navigate("/admin/product");
            }
        }
    }

    function handleChangeCategory(value) {
        const tmp = {...product};
        tmp.categoryId = value;
        setProduct(tmp);
    }

    function onChangeSize(value) {
        const tmp = {...product};
        tmp.sizeId = value;
        setProduct(tmp);

    };

    const { user: currentUser } = useSelector((state) => state.userSlice);

    if(currentUser?.roles?.includes("ROLE_ADMIN")) {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <div className="dashBoardNarBar">
                        <DashboardNavbar/>
                    </div>
                    <DashboardSidebar/>
                    <div className="wrapper-AdminHome">
                        <div className="">
                            <Box className=""
                                 component="main"
                                 sx={{
                                     flexGrow: 1,
                                     py: 8,
                                     backgroundColor: '#f9fafc'
                                 }}
                            >
                                {!id ? <DashboardTitle title="Thêm sản phẩm"/>
                                    : <DashboardTitle title="Chỉnh sửa sản phẩm"/>
                                }
                                <div className="edit-content">
                                    <div className="edit-content-header">
                                        <Link to="/admin/product"><CardBackButton/></Link>
                                        {!id ? <h5>Tạo mới sản phẩm</h5>
                                            : <h5>Chỉnh sửa sản phẩm</h5>
                                        }
                                    </div>
                                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
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
                                        <Grid item xs={12}>
                                            {headerField(7, "Chọn danh mục")}
                                            <FormControl fullWidth>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={product.categoryId}
                                                    value={product.categoryId}
                                                    name="radio-buttons-group"
                                                >
                                                    <div className="ratio-list">
                                                        {listCategory && listCategory.length ? listCategory.filter(i => i.parentId).map((item, index) =>
                                                            <FormControlLabel value={item.id} control={<Radio/>}
                                                                              label={<div>{item.name}</div>}
                                                                              onChange={(e) => handleChangeCategory(e.target.value)}/>
                                                        ) : null}
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <CustomError message={validate(product)?.categoryId}
                                                         isSaveClick={isSaveClick}/>

                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(8, "Chọn bộ sưu tập")}
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={product.collectionId}
                                                value={product.collectionId}
                                                name="radio-buttons-group"
                                            >
                                                <div className="ratio-list">
                                                    {collections && collections.length ? collections.map((item, index) =>
                                                        <FormControlLabel value={item.id} control={<Radio/>}
                                                                          label={<div>{item.name}</div>}
                                                                          onChange={(e) => handleChangeCollection(e.target.value)}/>
                                                    ) : null}
                                                </div>
                                            </RadioGroup>
                                            <CustomError message={validate(product)?.collectionId}
                                                         isSaveClick={isSaveClick}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(9, "Chọn Màu sắc")}
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={product.colorId}
                                                value={product.colorId}
                                                name="radio-buttons-group"
                                            >
                                                <div className="ratio-list">
                                                    {color && color.length ? color.map((item, index) =>
                                                        <FormControlLabel value={item.id} control={<Radio/>}
                                                                          label={<div>{item.name}</div>}
                                                                          onChange={(e) => handleChangeColor(e.target.value)}/>
                                                    ) : null}
                                                </div>
                                            </RadioGroup>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {headerField(10, "Chọn kích cỡ")}
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={product.sizeId}
                                                value={product.sizeId}
                                                name="radio-buttons-group"
                                            >
                                                <div className="ratio-list">
                                                    {size && size.length ? size.map((item, index) =>
                                                        <FormControlLabel value={item.id} control={<Radio/>}
                                                                          label={item.name}
                                                                          onChange={(e) => onChangeSize(e.target.value)}/>
                                                    ) : null}
                                                </div>
                                            </RadioGroup>

                                        </Grid>
                                        <Grid item xs={6}>
                                            {headerField(11, "Nhập giá")}
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
                                            {headerField(12, "Nhập giá")}
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
                                            <button className="btn-save pl-3" onClick={onSaveClick}>Lưu sản phẩm
                                            </button>
                                        </div>
                                    </Grid>
                                </div>
                            </Box>


                            {/*</div>*/}
                        </div>
                    </div>
                </ThemeProvider>
            </>
        );
    }
};
export default AddProduct;
