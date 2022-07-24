package com.example.ecommer.service;

public interface EmailSenderService {
    void sendMail(String userEmail, String confirmationToken);
    boolean sendSimpleMail(String to, String sub, String body);
}
