package com.example.ecommer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class ProductImageRequest {

    private Long productId;

    private boolean isPresident;

}
