package com.example.ecommer.repository;

import com.example.ecommer.model.Category;
import com.example.ecommer.model.Collections;
import com.example.ecommer.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollectionsRepository extends JpaRepository<Collections, Long> {

    Optional<Collections> findById(long id);

}
