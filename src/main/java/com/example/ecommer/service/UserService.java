package com.example.ecommer.service;

import com.example.ecommer.model.User;
import org.springframework.data.domain.Page;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface UserService {

    Page<User> findListUserPage(Integer pageNo, Integer limit, String keyword, Integer roleId);

    User findByUserId(Long id);

    void generateOneTimePassword(String email) throws MessagingException, UnsupportedEncodingException;

    void sendOTPEmail(User customer, String OTP) throws MessagingException, UnsupportedEncodingException;

    void clearOTP(User customer);

}
