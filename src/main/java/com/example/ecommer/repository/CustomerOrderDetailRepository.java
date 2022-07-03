package com.example.ecommer.repository;

import com.example.ecommer.model.CustomerOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerOrderDetailRepository extends JpaRepository<CustomerOrderDetail, Long> {

}
