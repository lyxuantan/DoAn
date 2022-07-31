package com.example.ecommer.repository;

import com.example.ecommer.model.CustomerOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.ecommer.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {

    Optional<CustomerOrder> findByUserAndStatus(Long userId, Integer status);

    Optional<CustomerOrder> findByIdAndStatus(Long id, Integer status);

    List<CustomerOrder> findAllByUserAndIsPaid(User userId, Boolean isPaid);

    List<CustomerOrder> findAllByUser(User user);

    Page<CustomerOrder> findAllByUserAndIsPaid(User userId, Boolean isPaid, Pageable pageable);

    @Query("SELECT c FROM CustomerOrder c WHERE c.isPaid = true")
    Page<CustomerOrder> findListCustomerOrderIsPaid(String keyword, Pageable pageable);


    @Query("SELECT c FROM CustomerOrder c WHERE c.isPaid = true")
    List<CustomerOrder> findAllListCustomerOrderIsPaid();

}


