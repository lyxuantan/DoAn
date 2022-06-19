package com.example.ecommer.controller.admin;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.repository.ProductImageRepository;
import com.example.ecommer.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("admin/upload")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductImageController {

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    ProductImageRepository productImageRepository;


    @PostMapping("")
    public ResponseEntity<ApiResponse> uploadFile(@RequestParam("productId") Long productId, @RequestParam("isPresident") boolean isPresident,  @RequestParam("file") MultipartFile[] file) {
        String message = "";
        try {
            productImageService.saveFile(file, productId, isPresident);

            return ResponseEntity.ok(new ApiResponse(ErrorCode.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse(ErrorCode.API_FAIL_UNKNOW));
        }
    }

    @GetMapping("/get-file/{id}")
    public ResponseEntity<ApiResponse> listFile(@PathVariable("id") Long id) {
        ApiResponse response;
        try {
            response = new ApiResponse(productImageService.getFile(id));
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

}
