package com.example.ecommer.repository;

import com.example.ecommer.model.Color;
import com.example.ecommer.model.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

//    @Query(value = "SELECT * FROM order_history",  nativeQuery = true)
//    List<OrderHistory> find;

}
