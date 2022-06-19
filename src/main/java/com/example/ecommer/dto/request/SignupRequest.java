package com.example.ecommer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SignupRequest {

    private String username;

    private String fullName;

    private String email;

    private String address;

    private String phoneNumber;

    private String password;

    private Set<String> role;

}
