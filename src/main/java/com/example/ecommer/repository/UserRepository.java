package com.example.ecommer.repository;

import com.example.ecommer.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = ?1")
    public User findByEmail(String email);




    @Query("SELECT u FROM User u WHERE CONCAT(u.fullName,' ',u.username,' ',u.email) like %?1%")
    Page<User> findAllUserPage(String keyword, Pageable pageable);

    @Query("SELECT u FROM User u WHERE CONCAT(u.fullName,' ',u.username,' ',u.email) LIKE %?1%")
    Page<User> findListUserPage(String keyword, Pageable pageable);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    User findByResetPasswordToken(String token);

    @Query("SELECT u.emailVerified FROM User u WHERE u.email = ?1")
    Boolean findEmailVerifiedByEmail(String email);
}
