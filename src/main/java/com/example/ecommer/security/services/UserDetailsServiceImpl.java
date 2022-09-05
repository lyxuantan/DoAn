package com.example.ecommer.security.services;

import com.example.ecommer.constant.ERole;
import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.SignupRequest;
import com.example.ecommer.dto.response.MessageResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Role;
import com.example.ecommer.model.User;
import com.example.ecommer.repository.RoleRepository;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    RoleRepository roleRepository;

    PasswordEncoder encoder;

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
        return userRepository.findListUserPage(keyword, pageable);
    }

    @Override
    public User findByUserId(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new CustomException("Không tìm thấy user"));
    }

    @Override
    public void generateOneTimePassword(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        String OTP = RandomString.make(8);
        String encodedOTP = encoder.encode(OTP);

        user.get().setOneTimePassword(encodedOTP);
        user.get().setOtpRequestedTime(new Date());
    }

    @Override
    public void sendOTPEmail(User customer, String OTP) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("contact@shopme.com", "Shopme Support");
        helper.setTo(customer.getEmail());

        String subject = "Here's your One Time Password (OTP) - Expire in 5 minutes!";

        String content = "<p>Hello " + customer.getFullName() + "</p>"
                + "<p>For security reason, you're required to use the following "
                + "One Time Password to login:</p>"
                + "<p><b>" + OTP + "</b></p>"
                + "<br>"
                + "<p>Note: this OTP is set to expire in 5 minutes.</p>";

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public void clearOTP(User customer) {
        customer.setOneTimePassword(null);
        customer.setOtpRequestedTime(null);
        userRepository.save(customer);
    }


    public User findByUsername() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
    }
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
        User customer = userRepository.findByEmail(email).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
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



