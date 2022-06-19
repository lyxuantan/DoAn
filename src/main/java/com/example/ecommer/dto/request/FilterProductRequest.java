package com.example.ecommer.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class FilterProductRequest {

    private Long id;

    private String name;

    private String title;

    private Long category_id;

    private List<Long> colors;

    private List<Long> material;

    private List<Long> size;

    private List<Long> collections;

    private Long priceFrom;

    private Long priceTo;

    private Long pageNo;

    private Long pageSize;

    private String direction;

}
