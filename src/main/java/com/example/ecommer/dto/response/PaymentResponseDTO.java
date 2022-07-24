package com.example.ecommer.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PaymentResponseDTO {

    private String status;
    private String message;
    private String url;
}
