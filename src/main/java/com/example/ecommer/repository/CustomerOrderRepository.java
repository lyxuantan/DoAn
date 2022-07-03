package com.example.ecommer.repository;

import com.example.ecommer.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ecommer.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {

    Optional<CustomerOrder> findByUserAndStatus(Long userId, Integer status);

    Optional<CustomerOrder> findByIdAndStatus(Long id, Integer status);

    List<CustomerOrder> findAllByUserAndStatus(User userId, Integer status);


}

