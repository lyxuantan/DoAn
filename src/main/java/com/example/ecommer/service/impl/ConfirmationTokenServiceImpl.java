package com.example.ecommer.service.impl;

import com.example.ecommer.model.ConfirmationToken;
import com.example.ecommer.model.User;
import com.example.ecommer.repository.ConfirmationTokenRepository;
import com.example.ecommer.service.ConfirmationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    public ConfirmationToken createToken(User user) {
        ConfirmationToken confirmationToken = new ConfirmationToken(user);
        return confirmationTokenRepository.save(confirmationToken);
    }

    @Override
    public ConfirmationToken findByConfirmationToken(String token) {
        return confirmationTokenRepository.findByConfirmationToken(token);
    }
}
