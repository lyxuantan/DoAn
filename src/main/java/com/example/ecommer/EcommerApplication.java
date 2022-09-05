package com.example.ecommer;

import com.example.ecommer.dto.request.SignupRequest;
import com.example.ecommer.security.services.UserDetailsImpl;
import com.example.ecommer.security.services.UserDetailsServiceImpl;
import com.example.ecommer.service.impl.UserServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableAsync
public class EcommerApplication {

    @SuppressWarnings("resource")
    public static void main(String[] args) {

        ConfigurableApplicationContext context = SpringApplication.run(EcommerApplication.class, args);
        SignupRequest signupRequest = new SignupRequest();
        Set<String> roles = new HashSet<>();
        roles.add("admin");
        signupRequest.setUsername("admin");
        signupRequest.setPassword("123456");
        signupRequest.setEmail("lyxuantan1@gmail.com");
        signupRequest.setFullName("ADMIN");
        signupRequest.setRole(roles);
        context.getBean(UserServiceImpl.class).signup(signupRequest); // <-- here

    }

}
