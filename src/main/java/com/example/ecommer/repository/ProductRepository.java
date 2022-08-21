package com.example.ecommer.repository;

import com.example.ecommer.model.Category;
import com.example.ecommer.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(long id);

    @Query(value = "SELECT * FROM product WHERE (category_id = :categoryId) and (price_sale > :priceFrom AND price_sale < :priceTo) and (collection_id in :collectionId or size_id in :sizeId or color_id in :colorId)", nativeQuery = true)
    Page<Product> findPageProductFilterCategoryAndPrice(Long priceFrom, Long priceTo, List<Long> collectionId, List<Long> sizeId, List<Long> colorId, Long categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE (category_id = :categoryId) and (collection_id in :collectionId or size_id in :sizeId or color_id in :colorId)", nativeQuery = true)
    Page<Product> findPageProductFilterCategory(List<Long> collectionId, List<Long> sizeId, List<Long> colorId, Long categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM product where category_id = :categoryId", nativeQuery = true)
    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM product where category_id = :categoryId and (price_sale > :priceFrom AND price_sale < :priceTo)", nativeQuery = true)
    Page<Product> findAllByCategoryIdAndPrice(Long priceFrom, Long priceTo, Long categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE category_id in :categoryId and name like %:keyword% ", nativeQuery = true)
    Page<Product> findAllByCategory(Set<Long> categoryId, String keyword, Pageable pageable);

    @Query(value = "SELECT p FROM Product p JOIN Collections c on p.collections.id=c.id where p.name like %?1%")
    Page<Product> findAllByKeyword(String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE collection_id = :collectionsFiler and  (size_id in :sizeId or color_id in :colorId)", nativeQuery = true)
    Page<Product> findPageProductFilterAndCollections(List<Long> sizeId, List<Long> colorId, Long collectionsFiler, Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE collection_id = :collectionsFiler and (price_sale > :priceFrom AND price_sale < :priceTo) and (size_id in :sizeId or color_id in :colorId)", nativeQuery = true)
    Page<Product> findPageProductFilterAndCollectionsAndPrice(Long priceFrom, Long priceTo, List<Long> sizeId, List<Long> colorId, Long collectionsFiler, Pageable pageable);
//    @Query(value = "SELECT p FROM Product p JOIN Collections c on p.collections.id=c.id where p.name like %?1%")
//    List<Product> findAllProduct(String keyword, Pageable pageable);

}

