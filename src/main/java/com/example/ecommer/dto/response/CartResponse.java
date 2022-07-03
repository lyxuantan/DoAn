package com.example.ecommer.dto.response;

import com.example.ecommer.model.CustomerOrderDetail;
import com.example.ecommer.model.User;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CartResponse {

    private Long id;

    private Date createTime;

    private Date updateTime;

    private User user;

    private Float total;

    private Float subTotal;

    private Float shipCost;

    private Long quantity;

    private Integer status;

    private List<CustomerOrderDetail> customerOrderDetails;
}
