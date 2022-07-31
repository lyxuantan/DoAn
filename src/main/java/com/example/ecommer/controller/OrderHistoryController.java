package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Category;
import com.example.ecommer.model.CategoryRequest;
import com.example.ecommer.model.CustomerOrder;
import com.example.ecommer.model.OrderHistory;
import com.example.ecommer.service.CategoryService;
import com.example.ecommer.service.OrderHistoryService;
import com.example.ecommer.service.impl.CustomerOrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("order-history")
@CrossOrigin(origins = "${watch.port}")
@Transactional
public class OrderHistoryController {

    @Autowired
    private OrderHistoryService orderHistoryService;

    @Autowired
    private CustomerOrderServiceImpl customerOrderService;

    @GetMapping("/get")
    public ResponseEntity<ApiResponse> findAll() {
        ApiResponse response;
        try {
            response = new ApiResponse(orderHistoryService.orderHistoryList());
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addOrderHistory(@RequestBody OrderHistory orderHistory) {
        ApiResponse response;
        try {
            orderHistoryService.save(orderHistory);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse> updateOrderHistory(@RequestBody OrderHistory orderHistory) {
        ApiResponse response;
        try {
            orderHistoryService.update(orderHistory);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/change-status")
    public ResponseEntity<ApiResponse> changeStatus(@RequestBody OrderHistory orderHistory) {
        ApiResponse response;
        try {
            customerOrderService.onChangeStatus(orderHistory);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/delete-order-history")
    public ResponseEntity<ApiResponse> deleteOrderHistory(@RequestBody OrderHistory orderHistory) {
        ApiResponse response;
        try {
            orderHistoryService.delete(orderHistory);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}
