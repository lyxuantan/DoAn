package com.example.ecommer.repository;

import com.example.ecommer.model.Category;
import com.example.ecommer.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(long id);

    @Query(value = "SELECT * FROM product WHERE (price_sale > :priceFrom AND price_sale < :priceTo) AND (collection_id in :collectionId or size_id in :sizeId or color_id in :colorId or material_id in :materialId)", nativeQuery = true)
    Page<Product> findPageProductFilter(Long priceFrom, Long priceTo, List<Long> collectionId, List<Long> sizeId, List<Long> colorId, List<Long> materialId, Pageable pageable);

    //    @Query("SELECT p from Product p ")
//    Page<Product> findListProductPage(String keyword, Long productId, Long collectionId, Long sizeId, Long colorId, Long materialId, String order);

}

