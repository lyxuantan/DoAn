package com.example.ecommer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "list_color")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Color extends Base {

    @Column(name = "`name`")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "colors")
    @JsonIgnore
    private List<Product> product = new ArrayList<>();
}
