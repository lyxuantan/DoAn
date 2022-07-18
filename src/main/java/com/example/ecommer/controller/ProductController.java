package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.FilterProductRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("product")
@CrossOrigin(origins = "http://localhost:3000")
@Transactional
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/get")
    public ResponseEntity<ApiResponse> listProduct(@RequestBody FilterProductRequest filterProductRequest) {
        ApiResponse response;
        try {
            response = new ApiResponse(productService.findListProductPage(filterProductRequest));
        } catch (CustomException e) {
            response = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("get-details")
    public ResponseEntity<ApiResponse> findProductById(@RequestParam(name = "productId") Long id) {
        ApiResponse response;
        try {
            response = new ApiResponse(productService.findById(id));
        } catch (CustomException e) {
            response = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

}
