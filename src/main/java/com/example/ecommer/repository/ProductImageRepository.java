package com.example.ecommer.repository;

import com.example.ecommer.model.Material;
import com.example.ecommer.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    Optional<ProductImage> findById(Long id);

    Optional<ProductImage> findProductImageByProductId(Long id);
}
