package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.service.CollectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("collection")
@CrossOrigin(origins = "http://localhost:3000")
@Transactional
public class CollectionController {

    @Autowired
    private CollectionsService collectionsService;

    @GetMapping("/get-all")
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
}
