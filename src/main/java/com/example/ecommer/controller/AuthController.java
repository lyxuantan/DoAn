package com.example.ecommer.controller;

import com.example.ecommer.constant.ERole;
import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.ApiResponse;
import com.example.ecommer.dto.request.LoginRequest;
import com.example.ecommer.dto.request.SignupRequest;
import com.example.ecommer.dto.request.VerifyEmailRequest;
import com.example.ecommer.dto.response.JwtResponse;
import com.example.ecommer.dto.response.MessageResponse;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.ConfirmationToken;
import com.example.ecommer.model.Role;
import com.example.ecommer.model.User;
import com.example.ecommer.repository.RoleRepository;
import com.example.ecommer.repository.UserRepository;
import com.example.ecommer.security.jwt.JwtUtils;
import com.example.ecommer.security.services.UserDetailsImpl;
import com.example.ecommer.security.services.UserDetailsServiceImpl;
import com.example.ecommer.service.ConfirmationTokenService;
import com.example.ecommer.service.EmailSenderService;
import com.example.ecommer.service.UserService;
import com.example.ecommer.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${watch.port}")
public class AuthController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private EmailSenderService emailSenderService;

    private Boolean emailVerified = false;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

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

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getAddress(),
                userDetails.getPhoneNumber(),
                roles
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getFullName(),
                signUpRequest.getEmail(),
                signUpRequest.getAddress(),
                signUpRequest.getPhoneNumber(),
                encoder.encode(signUpRequest.getPassword()));
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByType(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByType(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByType(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<?> getMethodName(@RequestParam("token") String token) {

        ConfirmationToken confirmationToken = confirmationTokenService.findByConfirmationToken(token);

        if (confirmationToken == null) {
            throw new CustomException("Invalid token");
        }

        User user = confirmationToken.getUser();
        Calendar calendar = Calendar.getInstance();

        if ((confirmationToken.getExpiryDate().getTime() -
                calendar.getTime().getTime()) <= 0) {
            return ResponseEntity.badRequest().body("Link expired. Generate new link from http://localhost:3000/login");
        }

        user.setEmailVerified(true);
        userRepository.save(user);
        return ResponseEntity.ok("Account verified successfully!");
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendVerificationMail(@Valid @RequestBody VerifyEmailRequest emailRequest) {
        if (Boolean.TRUE.equals(userRepository.existsByEmail(emailRequest.getEmail()))) {
                User user = userRepository.findByEmail(emailRequest.getEmail());
                ConfirmationToken token = confirmationTokenService.createToken(user);
                emailSenderService.sendMail(user.getEmail(), token.getConfirmationToken());
                return ResponseEntity.ok(new ApiResponse(ErrorCode.VERTIFICATION_SEND_MAIL));
//            }
        } else {
            throw new CustomException("Email is not associated with any account");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody LoginRequest loginRequest) {
        if (Boolean.TRUE.equals(userRepository.existsByEmail(loginRequest.getEmail()))) {
            if (changePassword(loginRequest.getEmail(), loginRequest.getPassword())) {
                return ResponseEntity.ok(new ApiResponse(ErrorCode.CHANGE_PASSWORD_SUCCESS));
            } else {
                throw new CustomException("Unable to change password. Try again!");
            }
        } else {
            throw new CustomException("User not found with this email id");
        }
    }

    @GetMapping("/get-user-login")
    public ResponseEntity<?> getUserLogin() {
        ApiResponse response;
        try {
            response = new ApiResponse(userDetailsService.findByUsername());
        }
        catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/user/update-user")
    public ResponseEntity<?> updateUser(@RequestBody SignupRequest user) {
        ApiResponse response;
        try {
            userServiceImpl.updateUser(user);
            response = new ApiResponse(ErrorCode.SUCCESS);
        }
        catch (CustomException e) {
            response = new ApiResponse(e);
        }
        return ResponseEntity.ok(response);
    }
}