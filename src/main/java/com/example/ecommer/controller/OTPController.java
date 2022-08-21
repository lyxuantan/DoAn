package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.ChangePasswordRequest;
import com.example.ecommer.dto.request.VerifyEmailRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.service.OTPService;
import com.example.ecommer.service.UserService;
import com.example.ecommer.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "${watch.port}")
public class OTPController {

    @Autowired
    private OTPService otpService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/generate-otp")
    public ResponseEntity<?> generateOtp(@Valid @RequestBody VerifyEmailRequest emailRequest) throws MessagingException, UnsupportedEncodingException {
        if (Boolean.TRUE.equals(userRepository.existsByEmail(emailRequest.getEmail()))) {
            userServiceImpl.generateOneTimePassword(emailRequest.getEmail());
            return ResponseEntity.ok(new ApiResponse(ErrorCode.SUCCESS));

        } else {
            throw new CustomException("Email is not associated with any account.");
        }
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@Valid @RequestBody ChangePasswordRequest emailRequest) {
        if (emailRequest.getOtpNo() != null) {
                if (userServiceImpl.changePassword(emailRequest.getEmail(), emailRequest.getPassword(), emailRequest.getOtpNo())) {
                    return ResponseEntity.ok(new ApiResponse(ErrorCode.CHANGE_PASSWORD_SUCCESS));
                }
        }
        return ResponseEntity.badRequest().body("Invalid OTP");
    }
}
