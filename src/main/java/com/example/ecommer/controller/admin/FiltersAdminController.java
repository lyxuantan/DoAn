package com.example.ecommer.controller.admin;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Collections;
import com.example.ecommer.model.Color;
import com.example.ecommer.model.Sizes;
import com.example.ecommer.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/filter")
@CrossOrigin(origins = "http://localhost:3000")
public class FiltersAdminController {

    @Autowired
    private FilterService collectionsService;

    @PostMapping("/add-collection")
    public ResponseEntity<ApiResponse> addUser(@RequestBody Collections collections) {
        ApiResponse response;
        try {

            collectionsService.saveCollections(collections);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-collection")
    public ResponseEntity<ApiResponse> updateUser(@RequestBody Collections collections) {
        ApiResponse response;
        try {
            collectionsService.update(collections);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/delete-collection")
    public ResponseEntity<ApiResponse> deleteUser(@RequestParam(name = "id") Long id) {
        ApiResponse response;
        try {
            collectionsService.delete(id);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }


    @PostMapping("/add-color")
    public ResponseEntity<ApiResponse> addColor(@RequestBody Color color) {
        ApiResponse response;
        try {

            collectionsService.saveColor(color);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-color")
    public ResponseEntity<ApiResponse> updateColor(@RequestBody Color color) {
        ApiResponse response;
        try {
            collectionsService.updateColor(color);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-size")
    public ResponseEntity<ApiResponse> addColor(@RequestBody Sizes sizes) {
        ApiResponse response;
        try {

            collectionsService.saveSize(sizes);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-size")
    public ResponseEntity<ApiResponse> updateColor(@RequestBody Sizes sizes) {
        ApiResponse response;
        try {
            collectionsService.updateSize(sizes);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}
