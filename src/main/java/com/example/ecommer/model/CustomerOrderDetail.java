package com.example.ecommer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
@Table(name = "customer_order_detail")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CustomerOrderDetail extends Base {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private CustomerOrder orderId;

    @Column(name = "price")
    private Float price = 0.0f;

    @Column(name = "price_ref")
    private Float priceRef = 0.0f;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "total", insertable=false, updatable=false)
    private Long total = 0L;

    @Column(name = "status")
    private Long status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @Fetch(FetchMode.JOIN)
    private Product product;
}
