package com.example.ecommer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    Long idOrder;
    Long amount;
    String description;
    String bankCode;
}