package com.example.ecommer.dto.request;

import com.example.ecommer.model.CustomerOrderDetail;
import lombok.*;

import java.util.List;

@Data
public class AddToCartRequest {

    private Long userId;

    private Long orderId;

    private Long productId;

    private Long quantity;

    private Integer status;

    private List<CustomerOrderDetail> customerOrderDetails;

    public AddToCartRequest() {
    }

    public AddToCartRequest(Long userId, Long orderId, Long productId, Long quantity, Integer status, List<CustomerOrderDetail> customerOrderDetails) {
        this.userId = userId;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.status = status;
        this.customerOrderDetails = customerOrderDetails;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
