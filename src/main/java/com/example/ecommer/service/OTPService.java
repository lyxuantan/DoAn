package com.example.ecommer.service;

public interface OTPService {

    Boolean generateOTP(String key);

    Boolean validateOTP(String key, Integer otpNumber);
}
