package com.example.ecommer.dto.request;

import lombok.*;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductRequest {

    private Long id;

    private String name;

    private String title;

    private String desc;

    private Float priceRef;

    private Float priceSale;

    private Long perDiscount;

    private Long total;

    private String content;

    private Integer status;

    private String image;

    private Long categoryId;

    private Long colorId;

    private Long materialId;

    private Long sizeId;

    private Long collectionId;

    private String glassSurface;

    private String thinkness;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Float getPriceRef() {
        return priceRef;
    }

    public void setPriceRef(Float priceRef) {
        this.priceRef = priceRef;
    }

    public Float getPriceSale() {
        return priceSale;
    }

    public void setPriceSale(Float priceSale) {
        this.priceSale = priceSale;
    }

    public Long getPerDiscount() {
        return perDiscount;
    }

    public void setPerDiscount(Long perDiscount) {
        this.perDiscount = perDiscount;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getColorId() {
        return colorId;
    }

    public void setColorId(Long colorId) {
        this.colorId = colorId;
    }

    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }

    public Long getSizeId() {
        return sizeId;
    }

    public void setSizeId(Long sizeId) {
        this.sizeId = sizeId;
    }

    public Long getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(Long collectionId) {
        this.collectionId = collectionId;
    }
}
