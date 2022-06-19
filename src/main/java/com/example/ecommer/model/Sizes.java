package com.example.ecommer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "list_size")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Sizes extends Base{

    @Column(name = "`name`")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "size")
    @JsonIgnore
    private List<Product> product = new ArrayList<>();
}
