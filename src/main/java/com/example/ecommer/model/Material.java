package com.example.ecommer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "list_material")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Material extends Base {

    @Column(name = "`name`")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "material")
    @JsonIgnore
    private List<Product> products = new ArrayList<>();
}
