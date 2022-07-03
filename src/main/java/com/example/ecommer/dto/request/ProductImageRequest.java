package com.example.ecommer.dto.request;

public class ProductImageRequest {

    private Long productId;

    private boolean isPresident;

    public ProductImageRequest() {
    }

    public ProductImageRequest(Long productId, boolean isPresident) {
        this.productId = productId;
        this.isPresident = isPresident;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public boolean isPresident() {
        return isPresident;
    }

    public void setPresident(boolean president) {
        isPresident = president;
    }


}
