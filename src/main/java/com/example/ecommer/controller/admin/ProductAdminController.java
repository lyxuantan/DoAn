package com.example.ecommer.controller.admin;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.ProductRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Product;
import com.example.ecommer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller(value = "ProductOfAdmin")
@RequestMapping("admin/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductAdminController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addProduct(@RequestBody Product productRequest) {
        ApiResponse response;
        try {
            productService.saveProduct(productRequest);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse> updateUser(@RequestBody Product productRequest) {
        ApiResponse response;
        try {
            productService.update(productRequest);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable(name = "id") Long id) {
        ApiResponse response;
        try {
            productService.delete(id);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}
