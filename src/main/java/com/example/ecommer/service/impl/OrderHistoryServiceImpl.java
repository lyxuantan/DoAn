package com.example.ecommer.service.impl;
import com.example.ecommer.model.CustomerOrder;
import com.example.ecommer.model.OrderHistory;
import com.example.ecommer.repository.CustomerOrderRepository;
import com.example.ecommer.repository.OrderHistoryRepository;
import com.example.ecommer.service.OrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderHistoryServiceImpl implements OrderHistoryService {

    @Autowired
    private OrderHistoryRepository orderHistoryRepository;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Override
    public List<OrderHistory> orderHistoryList() {
        return orderHistoryRepository.findAllOrderHistory();
    }

    @Override
    public OrderHistory save(OrderHistory orderHistory) {
        OrderHistory newOrderHistory = new OrderHistory();
        if(orderHistory.getCustomerOrderId() != null)
        {
            Optional<CustomerOrder> orderHistoryExit = customerOrderRepository.findById(orderHistory.getCustomerOrderId());
            if(orderHistoryExit.isPresent()) {
                newOrderHistory.setCustomerOrder(orderHistoryExit.get());
            }
        }
        newOrderHistory.setDate(orderHistory.getDate());
        return orderHistoryRepository.save(newOrderHistory);
    }

    @Override
    public OrderHistory update(OrderHistory orderHistory) {
        return new OrderHistory();

    }

    @Override
    public OrderHistory delete(OrderHistory orderHistory) {
        return null;
    }


}
