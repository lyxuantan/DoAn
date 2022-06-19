package com.example.ecommer.repository;

import com.example.ecommer.model.Category;
import com.example.ecommer.model.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SizesRepository extends JpaRepository<Sizes, Long> {

    Optional<Sizes> findById(long id);

}
