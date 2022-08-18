package com.example.ecommer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    Long idOrder;
    Float amount;
    Long amountLong;
    String description;
    String bankCode;
    String username;
    String address;
}
