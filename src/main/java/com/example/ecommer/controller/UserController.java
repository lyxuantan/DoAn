package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.ChangePasswordRequest;
import com.example.ecommer.dto.request.SignupRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.service.UserService;
import com.example.ecommer.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "${watch.port}")
@Transactional
public class UserController {

    @Autowired
    private UserServiceImpl userService;



    @GetMapping("/get-user-details")
    public ResponseEntity<ApiResponse> getListCategory() {
        ApiResponse response;
        try {
            response = new ApiResponse(userService.findUserLogin());
        } catch (CustomException e) {
            response  = new ApiResponse(e);
        } catch (Exception e) {
            response = new ApiResponse(ErrorCode.API_FAIL_UNKNOW);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody SignupRequest user) {
        ApiResponse response;
        try {
            userService.updateUser(user);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/change-password")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> changeUser(@RequestBody ChangePasswordRequest changePasswordRequest) {
        ApiResponse response;
        try {
            userService.changePasswordLogined(changePasswordRequest);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}
