package com.example.ecommer.repository;

import com.example.ecommer.model.ConfirmationToken;
import com.example.ecommer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
    ConfirmationToken findByConfirmationToken(String token);

    ConfirmationToken findByUser(User user);
}
