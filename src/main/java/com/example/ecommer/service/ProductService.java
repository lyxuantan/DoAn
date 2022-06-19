package com.example.ecommer.service;

import com.example.ecommer.dto.request.FilterProductRequest;
import com.example.ecommer.dto.request.ProductRequest;
import com.example.ecommer.model.Category;
import com.example.ecommer.model.CategoryRequest;
import com.example.ecommer.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    List<Product> listProduct();

    Page<Product> findListProductPage(FilterProductRequest filterProductRequest);

    void saveProduct(ProductRequest category);

    void delete(Long id);

    void update(ProductRequest productRequest);

    Product findById(Long id);
}
