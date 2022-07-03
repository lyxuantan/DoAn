package com.example.ecommer.controller.admin;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Collections;
import com.example.ecommer.service.CollectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/collection")
@CrossOrigin(origins = "http://localhost:3000")
public class CollectionsAdminController {

    @Autowired
    private CollectionsService collectionsService;

    @PostMapping("/add")
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

    @PostMapping("/update")
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

    @GetMapping("/delete")
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
}
