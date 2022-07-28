package com.example.ecommer.service.impl;

import com.example.ecommer.exception.CustomException;
import com.example.ecommer.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendMail(String userEmail, String confirmationToken) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userEmail);
        mailMessage.setSubject("Account Activation!");
        mailMessage.setText("To confirm your account, please click here : "
                + "http://localhost:8080/api/auth/confirm-account?token=" + confirmationToken
                + "   Note: This link will expire after 10 minutes.");
        javaMailSender.send(mailMessage);
    }

    @Override
    @Async
    public void sendSimpleMail(String to, String sub, String body) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(sub);
        mailMessage.setText(body);
        boolean isSent = false;
        javaMailSender.send(mailMessage);

        try {
            javaMailSender.send(mailMessage);
            isSent = true;
        } catch (Exception e) {
            throw new CustomException("Không gửi được OTP vui lòng thử lại!");
        }

    }
}
