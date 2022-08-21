package com.example.ecommer.dto.request;

import lombok.Data;

@Data
public class ChangePasswordRequest {

    private String email;
    private String password;
    private String newPassword;
    private String reNewPassword;
    private String otpNo;
    private Boolean isOTPMail;
}
