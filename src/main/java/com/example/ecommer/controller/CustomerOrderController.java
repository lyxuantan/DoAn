package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.AddToCartRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.service.CustomerOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("order")
@CrossOrigin(origins = "http://localhost:3000")
@Transactional
public class CustomerOrderController {

    @Autowired
    private CustomerOrderService customerOrderService;

    @GetMapping("/find-order-active-by-user")
    public ResponseEntity<ApiResponse> listOrderActiveByUser(@RequestParam(value = "userId", required = true) Long userId,
                                                             @RequestParam(value = "status", required = false) Integer status) {
        ApiResponse response;
        try {
            response = new ApiResponse(customerOrderService.findByUserAndStatus(userId, status));
        } catch (CustomException e) {
            response = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addOrder(@RequestBody AddToCartRequest addToCartRequest) {
        ApiResponse response;
        try {
            customerOrderService.addToCard(addToCartRequest);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse> updateUser(@RequestBody AddToCartRequest addToCartRequest) {
        ApiResponse response;
        try {
            customerOrderService.updateCard(addToCartRequest);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}
