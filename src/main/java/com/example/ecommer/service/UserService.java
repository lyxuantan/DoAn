package com.example.ecommer.service;

import com.example.ecommer.dto.request.SignupRequest;
import com.example.ecommer.model.User;
import org.springframework.data.domain.Page;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Set;

public interface UserService {

    Page<User> findListUserPage(Integer pageNo, Integer limit, String keyword, Integer roleId);

    User findByUserId(Long id);

    void generateOneTimePassword(String email) throws MessagingException, UnsupportedEncodingException;

    void sendOTPEmail(User customer, String OTP) throws MessagingException, UnsupportedEncodingException;

    void clearOTP(User customer);

//    void signup(String username, String fullName, String email, String address, String phoneNumber, String password, Set roles);

}
