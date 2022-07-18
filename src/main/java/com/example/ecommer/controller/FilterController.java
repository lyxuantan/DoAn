package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("filter")
@CrossOrigin(origins = "http://localhost:3000")
@Transactional
public class FilterController {

    @Autowired
    private FilterService collectionsService;

    @GetMapping("/get-by-category")
    public ResponseEntity<ApiResponse> listCategory(@RequestParam(value = "categoryId") Long categoryId) {
        ApiResponse response;
        try {
            response = new ApiResponse(collectionsService.findByCategory(categoryId));
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }


    @GetMapping("/get-all-collection")
    public ResponseEntity<ApiResponse> getAllCollection() {
        ApiResponse response;
        try {
            response = new ApiResponse(collectionsService.listCollections());
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-all-color")
    public ResponseEntity<ApiResponse> getColor() {
        ApiResponse response;
        try {
            response = new ApiResponse(collectionsService.listColor());
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-all-size")
    public ResponseEntity<ApiResponse> getSize() {
        ApiResponse response;
        try {
            response = new ApiResponse(collectionsService.listSize());
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }
}
