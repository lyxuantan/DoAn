package com.example.ecommer.controller.admin;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.User;
import com.example.ecommer.security.services.UserDetailsServiceImpl;
import com.example.ecommer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(value = "admin/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserAdminController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;



    @GetMapping(value = "")
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
            response  = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}
