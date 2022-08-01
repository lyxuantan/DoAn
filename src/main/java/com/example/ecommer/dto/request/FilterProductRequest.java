package com.example.ecommer.dto.request;

import lombok.*;

import java.util.List;

@Data
public class FilterProductRequest {

    private Long id;

    private String name;

    private String title;

    private Long categoryId;

    private Long parentCategoryId;

    private List<Long> colors;

    private List<Long> material;

    private List<Long> size;

    private List<Long> collections;

    private Long priceFrom;

    private Long priceTo;

    private Integer pageNo = 1;

    private Integer pageSize = 4;

    private String keyword;

    private String direction = "ASC";

    private String orderBy = "id";

    private Boolean isBestSell = false;

    private Boolean isAdminPageProduct = false;

    private Long collectionId;


    private Boolean isFindCollections = false;

    public FilterProductRequest() {
    }

    public FilterProductRequest(Long id, String name, String title, Long categoryId, Long parentCategoryId, List<Long> colors, List<Long> material, List<Long> size, List<Long> collections, Long priceFrom, Long priceTo, Integer pageNo, Integer pageSize, String direction, String orderBy, Boolean isBestSell) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.categoryId = categoryId;
        this.parentCategoryId = parentCategoryId;
        this.colors = colors;
        this.material = material;
        this.size = size;
        this.collections = collections;
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.direction = direction;
        this.orderBy = orderBy;
        this.isBestSell = isBestSell;
    }

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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(Long parentCategoryId) {
        this.parentCategoryId = parentCategoryId;
    }

    public List<Long> getColors() {
        return colors;
    }

    public void setColors(List<Long> colors) {
        this.colors = colors;
    }

    public List<Long> getMaterial() {
        return material;
    }

    public void setMaterial(List<Long> material) {
        this.material = material;
    }

    public List<Long> getSize() {
        return size;
    }

    public void setSize(List<Long> size) {
        this.size = size;
    }

    public List<Long> getCollections() {
        return collections;
    }

    public void setCollections(List<Long> collections) {
        this.collections = collections;
    }

    public Long getPriceFrom() {
        return priceFrom;
    }

    public void setPriceFrom(Long priceFrom) {
        this.priceFrom = priceFrom;
    }

    public Long getPriceTo() {
        return priceTo;
    }

    public void setPriceTo(Long priceTo) {
        this.priceTo = priceTo;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public Boolean getBestSell() {
        return isBestSell;
    }

    public void setBestSell(Boolean bestSell) {
        isBestSell = bestSell;
    }
}
