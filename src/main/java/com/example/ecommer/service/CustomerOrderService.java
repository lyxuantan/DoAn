package com.example.ecommer.service;

import com.example.ecommer.dto.request.AddToCartRequest;
import com.example.ecommer.dto.response.CartResponse;
import com.example.ecommer.model.CustomerOrder;

import java.util.List;

public interface CustomerOrderService {

    CustomerOrder findById(Long id);

    List<CartResponse> findByUserAndStatus(Long id, Integer status);

    void addToCard(AddToCartRequest addToCartRequest);

    void updateCard(AddToCartRequest addToCartRequest);
}
