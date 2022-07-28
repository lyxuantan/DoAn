package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.FilterProductRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.security.services.UserDetailsImpl;
import com.example.ecommer.service.ProductService;
import com.example.ecommer.service.impl.ProductServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

import static com.example.ecommer.security.jwt.JwtUtils.authentication;

@RestController
@RequestMapping("product")
@CrossOrigin(origins = "${watch.port}")
@Transactional
public class ProductController {
    static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);


    @Autowired
    private ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<ApiResponse> getAllProduct() {
        ApiResponse response;
        try {
            response = new ApiResponse(productService.listProduct());
        } catch (CustomException e) {
            response = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/get")
    public ResponseEntity<ApiResponse> listProduct(@RequestBody FilterProductRequest filterProductRequest) {
        ApiResponse response;
//        System.out.println("abc"+userDetails.getUsername());
//        logger.info("Creating Token for user", username);

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
