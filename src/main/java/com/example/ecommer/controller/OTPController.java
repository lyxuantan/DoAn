package com.example.ecommer.controller;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.VerifyEmailRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "http://localhost:3000")
public class OTPController {

    @Autowired
    private OTPService otpService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/generate-otp")
    public ResponseEntity<?> generateOtp(@Valid @RequestBody VerifyEmailRequest emailRequest) {

        if (Boolean.TRUE.equals(userRepository.existsByEmail(emailRequest.getEmail()))) {
            if (Boolean.TRUE.equals(otpService.generateOTP(emailRequest.getEmail()))) {
                return ResponseEntity.ok(new ApiResponse(ErrorCode.SUCCESS));
            } else {
                throw new CustomException("Unable to send OTP. try again");
            }
        } else {
            throw new CustomException("Email is not associated with any account.");
        }
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@Valid @RequestBody VerifyEmailRequest emailRequest) {
        if (emailRequest.getOtpNo() != null) {
            if (Boolean.TRUE.equals(otpService.validateOTP(emailRequest.getEmail(), emailRequest.getOtpNo()))) {
                return ResponseEntity.ok(new ApiResponse(ErrorCode.SUCCESS));
            }
        }
        return ResponseEntity.badRequest().body("Invalid OTP");
    }
}
