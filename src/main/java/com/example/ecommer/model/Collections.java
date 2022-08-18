package com.example.ecommer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Table(name = "list_collection")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Collections extends Base {

    @Column(name = "`name`")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "collections")
    @JsonIgnore
    private List<Product> product = new ArrayList<>();

    @Column(name = "category_id")
    @JsonIgnore
    private Long categoryId;


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})

    @JoinTable(name = "category_collection", //Tạo ra một join Table tên là "address_person"
            joinColumns = @JoinColumn(name = "collection_id"),  // TRong đó, khóa ngoại chính là address_id trỏ tới class hiện tại (Address)
            inverseJoinColumns = @JoinColumn(name = "category_id") //Khóa ngoại thứ 2 trỏ tới thuộc tính ở dưới (Person)
    )
    @JsonIgnore
    private Collection<Category> categories;
}
