package com.example.ecommer.model;

import com.example.ecommer.data.UploadsFiles;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "product")
@AllArgsConstructor
@Setter
@Getter
public class Product implements UploadsFiles, Serializable {

    private static final long serialVersionUID = 4641853311314844969L;
    public static Integer STATUS_ACTIVE = 1;
    public static Integer STATUS_DEACTIVE = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", unique = true, nullable = false)
    private Long id;


    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "create_time")
    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdTime;

    @Column(name = "update_time")
    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    @Column(name = "`name`")
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "`desc`")
    private String desc;

    @Column(name = "price_ref")
    private Float priceRef;

    @Column(name = "price_sale")
    private Float priceSale;

    @Column(name = "per_discount")
    private Long perDiscount;

    @Column(name = "content")
    private String content;

    @Column(name = "status")
    private Integer status;

    @Column(name = "image")
    private String image;

    @Column(name = "sale_number")
    private Long saleNumber;

    @Column(name = "total")
    private Long total;

    @Column(name = "glass_surface")
    private String glassSurface;

    @Column(name = "thinkness")
    private String thinkness;

    @Transient
    private Long colorId;

    @Transient
    private Long materialId;

    @Transient
    private Long sizeId;

    @Transient
    private Long collectionId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "productId")
    private List<ProductImage> productImages = new ArrayList<ProductImage>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "products")
    @JsonIgnore
    private List<Category> categories = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "color_id")
    @Fetch(FetchMode.JOIN)
    private Color colors;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "material_id")
    @Fetch(FetchMode.JOIN)
    private Material material;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "size_id")
    @Fetch(FetchMode.JOIN)
    private Sizes size;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "collection_id")
    @Fetch(FetchMode.JOIN)
    private Collections collections;
//
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @JsonIgnore
    private Set<CustomerOrderDetail> customerOrderDetails = new HashSet<>();

//    @Transient
//    public List<ProductImage> getProductImages() {
//        return productImages.stream()
//                // 3, 2, 4 su dung sorted --> 2, 3, 4, reversed --> 4, 3, 2
//                .map(item -> {
//                    item.createImgUrl();
//                    return item;
//                }).collect(Collectors.toList());
//    }

    public String statusLable() {
        return mapStatus().get(status);
    }


    public Map<Integer, String> mapStatus() {
        HashMap maps = new HashMap<Integer, String>();
        maps.put(STATUS_ACTIVE, "Kích hoạt");
        maps.put(STATUS_DEACTIVE, "Ngưng");
        return maps;
    }

    @Transient
    // Khai báo đây không phải là cột trong db, để spring không mapping với model.
    public List<MultipartFile> multipartFile;

    public static String UPLOAD_PATH = "/uploads/product/";

    public Product() {
    }

    @Override
    public String folderUpload() {
        return UPLOAD_PATH;
    }

    @Override
    public List<String> filePass() {
        return Arrays.asList("png", "jpg");
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

//    public void setProductImages(List<ProductImage> productImages) {
//        this.productImages = productImages;
//    }

    public Color getColors() {
        return colors;
    }

    public void setColors(Color colors) {
        this.colors = colors;
    }

    public List<MultipartFile> getMultipartFile() {
        return multipartFile;
    }

    public void setMultipartFile(List<MultipartFile> multipartFile) {
        this.multipartFile = multipartFile;
    }


}
