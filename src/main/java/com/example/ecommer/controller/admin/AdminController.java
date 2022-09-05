package com.example.ecommer.controller.admin;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.ChangePasswordRequest;
import com.example.ecommer.dto.request.SignupRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.User;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.security.services.UserDetailsServiceImpl;
import com.example.ecommer.service.impl.CustomerOrderServiceImpl;
import com.example.ecommer.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/admin")
@CrossOrigin(origins = "${watch.port}")
public class AdminController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private CustomerOrderServiceImpl customerOrderDetailService;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    UserRepository userRepository;


    @GetMapping(value = "/user")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> viewUser(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "keyword", defaultValue = "") String keyword,
            @RequestParam(name = "roleId", required = false, defaultValue = "0") Integer roleId
    ) {
        ApiResponse response;
        try {
            Page<User> pageUser = userDetailsService.findListUserPage(page, limit, keyword, roleId);
            response = new ApiResponse(pageUser);
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/user/update")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteUser(@RequestBody SignupRequest user) {
        ApiResponse response;
        try {
            userService.updateUser(user);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }



    @GetMapping("/user/get-details")
    public ResponseEntity<ApiResponse> getUserDetails(@RequestBody ChangePasswordRequest changePasswordRequest) {
        ApiResponse response;
        try {
            userService.changePasswordLogined(changePasswordRequest);
            response = new ApiResponse(ErrorCode.SUCCESS);
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/delete-user")
    public ResponseEntity<ApiResponse> deleteUser(@RequestParam(name = "userId") Long userId) {
        ApiResponse response;
        try {
            Optional<User> userExists = userRepository.findById(userId);
            if(userExists.isPresent()){
                if(userExists.get().getRoles().contains("ADMIN")) {
                    throw new CustomException(ErrorCode.NOT_DELETE_ADMIN);
                }
                userRepository.deleteById(userId);
                response = new ApiResponse(ErrorCode.SUCCESS);
            }
            else {
                throw new CustomException(ErrorCode.NOT_FOUND);
            }
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/customer-order-details")
    public ResponseEntity<ApiResponse> viewCustomerOrderDetails(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(name = "keyword", defaultValue = "") String keyword,
            @RequestParam(name = "isPaid", required = false, defaultValue = "1")  Boolean isPaid
    ) {
        ApiResponse response;
        try {
            response = new ApiResponse(customerOrderDetailService.findByUserAndStatusPage(true, page, limit));
        } catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}
