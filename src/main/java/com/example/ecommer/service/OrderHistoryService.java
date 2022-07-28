package com.example.ecommer.service;

import com.example.ecommer.model.OrderHistory;

import java.util.List;

public interface OrderHistoryService {

    List<OrderHistory> orderHistoryList();

    OrderHistory save(OrderHistory orderHistory);

    OrderHistory update(OrderHistory orderHistory);

    OrderHistory delete(OrderHistory orderHistory);


}
