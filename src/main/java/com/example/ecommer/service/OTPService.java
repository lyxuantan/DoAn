package com.example.ecommer.service;

public interface OTPService {

    void generateOTP(String key);

    Boolean validateOTP(String key, Integer otpNumber);
}
