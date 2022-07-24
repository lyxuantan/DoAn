package com.example.ecommer.security.services;

import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.User;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserService {

    @Autowired
    UserRepository userRepository;



    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        return UserDetailsImpl.build(user);
    }

    @Override
    public Page<User> findListUserPage(Integer pageNo, Integer limit, String keyword, Integer roleId) {
        PageRequest pageable = PageRequest.of(pageNo - 1, limit, Sort.by("id").ascending());
        if (roleId == 0) {
            return userRepository.findAllUserPage(keyword, pageable);
        }
        return userRepository.findListUserPage(keyword, pageable);    }

//    public boolean changePassword(String email, String password) {
//        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
//        if (!user.isPresent()) {
//            throw new CustomException("User not found");
//        }
//        user.get().setPassword(passwordEncoder.encode(password));
//        User user1 = userRepository.save(user.get());
//        if (user1 != null) {
//            return true;
//        }
//        return false;
//    }

    public void updateResetPasswordToken(String token, String email) throws UsernameNotFoundException {
        User customer = userRepository.findByEmail(email);
        if (customer != null) {
            customer.setResetPasswordToken(token);
            userRepository.save(customer);
        } else {
            throw new UsernameNotFoundException("Could not find any customer with the email " + email);
        }
    }

    public User getByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token);
    }

    public void updatePassword(User customer, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        customer.setPassword(encodedPassword);

        customer.setResetPasswordToken(null);
        userRepository.save(customer);
    }

    @Transactional
    public boolean isAccountVerified(String email){
        return userRepository.findEmailVerifiedByEmail(email);
    }
}
//    public void updateResetPasswordToken(String token, String email) throws CustomerNotFoundException {
//        Customer customer = customerRepo.findByEmail(email);
//        if (customer != null) {
//            customer.setResetPasswordToken(token);
//            customerRepo.save(customer);
//        } else {
//            throw new CustomerNotFoundException("Could not find any customer with the email " + email);
//        }
//    }
//
//    public Customer getByResetPasswordToken(String token) {
//        return customerRepo.findByResetPasswordToken(token);
//    }
//
//    public void updatePassword(Customer customer, String newPassword) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String encodedPassword = passwordEncoder.encode(newPassword);
//        customer.setPassword(encodedPassword);
//
//        customer.setResetPasswordToken(null);
//        customerRepo.save(customer);
//    }



