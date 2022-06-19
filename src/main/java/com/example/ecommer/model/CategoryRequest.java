package com.example.ecommer.model;

import lombok.Data;
import java.util.Date;

@Data
public class CategoryRequest {

    private Integer id;

    private Date createdAt;

    private Date updateAt;

    private Long parentId;

    private String name;

    private String title;

    private String desc;

    private String content;

    public CategoryRequest() {
    }
}
