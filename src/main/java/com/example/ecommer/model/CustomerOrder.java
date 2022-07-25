package com.example.ecommer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "customer_order")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CustomerOrder extends Base{

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "orderId", cascade = CascadeType.ALL)
    private List<CustomerOrderDetail> customerOrderDetails = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id")
//    @JsonIgnore
    private User user;

    @Column(name = "total")
    private Float price;

    @Column(name = "total", insertable=false, updatable=false)
    private Long total;

    @Column(name = "status")
    private Integer status = 0;

    @Column(name = "is_paid")
    private Boolean isPaid = true;


//    @OneToOne // Đánh dấu có mỗi quan hệ 1-1 với Person ở phía dưới
//    @JoinColumn(name = "person_id") // Liên kết với nhau qua khóa ngoại person_id
//    private Person person;
}
