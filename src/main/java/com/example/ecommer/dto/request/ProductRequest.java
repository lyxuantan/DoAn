package com.example.ecommer.dto.request;

import com.example.ecommer.model.Collections;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductRequest {

    private Long id;

    private String name;

    private String title;

    private String desc;

    private Long priceRef;

    private Long priceSale;

    private Long perDiscount;

    private String content;

    private Integer status;

    private String image;

    private Long categoryId;

    private Long colorId;

    private Long materialId;

    private Long sizeId;

    private Long collectionId;

}
