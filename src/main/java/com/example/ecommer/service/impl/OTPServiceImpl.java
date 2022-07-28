package com.example.ecommer.service.impl;

import com.example.ecommer.exception.CustomException;
import com.example.ecommer.service.EmailSenderService;
import com.example.ecommer.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OTPServiceImpl implements OTPService {

    @Autowired
    private OTPGeneratorServiceImpl otpGeneratorServiceImpl;

    @Autowired
    private EmailSenderService emailSenderService;

    @Override
    public void generateOTP(String key) {
        int otpValue = otpGeneratorServiceImpl.generateOTP(key);
        if (otpValue == -1)
        {
            throw new  CustomException("OTP Không Hợp Lệ");
        }
        String message = "OTP " + otpValue +". This OTP is valid for 5 minutes.";
        emailSenderService.sendSimpleMail(key, "Password Reset", message);
    }

    @Override
    public Boolean validateOTP(String key, Integer otpNumber) {
        Integer cacheOTP = otpGeneratorServiceImpl.getOtp(key);
        if (cacheOTP.equals(otpNumber))
        {
            otpGeneratorServiceImpl.clearOTP(key);
            return true;
        }
        otpGeneratorServiceImpl.clearOTP(key);
        return false;
    }
}
