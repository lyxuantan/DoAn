package com.example.ecommer.service;


import com.example.ecommer.model.ConfirmationToken;
import com.example.ecommer.model.User;

public interface ConfirmationTokenService {

    ConfirmationToken createToken(User user);

    ConfirmationToken findByConfirmationToken(String token);
}
