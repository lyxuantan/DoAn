package com.example.ecommer.service;

public interface EmailSenderService {
    void sendMail(String userEmail, String confirmationToken);
    void sendSimpleMail(String to, String sub, String body);
}
