package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.ChangePasswordRequest;
import com.example.ecommer.dto.request.SignupRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.User;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
    PasswordEncoder encoder;

    @Override
    public Page<User> findListUserPage(Integer pageNo, Integer limit, String keyword, Integer roleId) {
        PageRequest pageable = PageRequest.of(pageNo - 1, limit, Sort.by("id").ascending());
        if (roleId == 0) {
            return userRepository.findAllUserPage(keyword, pageable);
        }
        return userRepository.findListUserPage(keyword, pageable);
    }

    @Override
    public User findByUserId(Long id) {
        return null;
    }

    public User findUserLogin() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userExist = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        return userExist;
    }

    public void updateUser(SignupRequest user) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userExist = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        userExist.setFullName(user.getFullName());
        userExist.setEmail(user.getEmail());
        userExist.setPhoneNumber(user.getPhoneNumber());
        userRepository.save(userExist);
    }

    public boolean changePassword(String email, String password) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));
        if (!user.isPresent()) {
            throw new CustomException("User not found");
        }
        user.get().setPassword(encoder.encode(password));
        User user1 = userRepository.save(user.get());
        if (user1 != null) {
            return true;
        }
        return false;
    }

    public boolean changePasswordLogined(ChangePasswordRequest changePasswordRequest) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(changePasswordRequest.getEmail()));
        if (!user.isPresent()) {
            throw new CustomException("User not found");
        }
        if ((!encoder.encode(changePasswordRequest.getNewPassword()).equals(user.get().getPassword())) &&
                !(changePasswordRequest.getIsOTPMail().equals("true"))) {
            throw new CustomException("Mật Khẩu Không Khớp Với Mật Khẩu Hiện Tại");
        }
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getReNewPassword())) {
            throw new CustomException("Mật Khẩu Xác Nhận Không Hợp Lệ");
        }
        if (changePasswordRequest.getNewPassword().length() < 4) {
            throw new CustomException("Mật Khẩu Phải Lớn Hơn 4 Ký Tự");
        }
        user.get().setPassword(encoder.encode(changePasswordRequest.getNewPassword()));
        User user1 = userRepository.save(user.get());
        if (user1 != null) {
            return true;
        }
        return false;
    }

}
