package com.example.ecommer.repository;

import com.example.ecommer.model.Category;
import com.example.ecommer.model.Material;
import com.example.ecommer.util.MediaTypeUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {

    Optional<Material> findById(Long id);
}
