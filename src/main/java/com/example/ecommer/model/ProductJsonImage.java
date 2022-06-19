package com.example.ecommer.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductJsonImage implements Serializable {

    private static final long serialVersionUID = 7048428705613080544L;
    private String name;
    private String title;
    private String file;

}
