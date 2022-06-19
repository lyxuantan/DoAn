package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.FilterProductRequest;
import com.example.ecommer.dto.request.ProductRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.*;
import com.example.ecommer.repository.*;
import com.example.ecommer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SizesRepository sizesRepository;

    @Autowired
    private CollectionsRepository collectionsRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private MaterialRepository materialRepository;


    @Override
    public List<Product> listProduct() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> findListProductPage(FilterProductRequest filterProductRequest) {
        PageRequest pageable = PageRequest.of(Math.toIntExact(filterProductRequest.getPageNo() - 1), Math.toIntExact(filterProductRequest.getPageSize()), Sort.by("product_id").ascending());
        return productRepository.findPageProductFilter(filterProductRequest.getPriceFrom(), filterProductRequest.getPriceTo(), filterProductRequest.getCollections(), filterProductRequest.getSize(), filterProductRequest.getColors(), filterProductRequest.getMaterial(), pageable);
    }

    @Override
    public void saveProduct(ProductRequest productRequest) {
        Product product = new Product();
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CATEGORY));
        Optional<Color> color = colorRepository.findById(productRequest.getColorId());
        Optional<Material> material = materialRepository.findById(productRequest.getMaterialId());
        Optional<Sizes> sizes = sizesRepository.findById(productRequest.getSizeId());
        Optional<Collections> collections = collectionsRepository.findById(productRequest.getCollectionId());
        if (color.isPresent()) {
            product.setColors(color.get());
        }
        if (material.isPresent()) {
            product.setMaterial(material.get());
        }
        if (sizes.isPresent()) {
            product.setSize(sizes.get());
        }
        if (collections.isPresent()) {
            product.setCollections(collections.get());
        }
        product.setCategoryId(category.getId());
        product.setName(productRequest.getName());
        product.setContent(productRequest.getContent());
        product.setDesc(productRequest.getDesc());
        product.setStatus(productRequest.getStatus());
        product.setPerDiscount(productRequest.getPerDiscount());
        product.setPriceRef(productRequest.getPriceRef());
        product.setPriceSale(productRequest.getPriceSale());
        productRepository.save(product);
    }

    @Override
    public void delete(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        if (product != null) {
            productRepository.deleteById(id);
        }
    }

    @Override
    public void update(ProductRequest productRequest) {
        Product product = productRepository.findById(productRequest.getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CATEGORY));
        if (product != null) {
            Optional<Color> color = colorRepository.findById(productRequest.getColorId());
            Optional<Material> material = materialRepository.findById(productRequest.getMaterialId());
            Optional<Sizes> sizes = sizesRepository.findById(productRequest.getSizeId());
            Optional<Collections> collections = collectionsRepository.findById(productRequest.getCollectionId());

            if (color.isPresent()) {
                product.setColors(color.get());
            }
            if (material.isPresent()) {
                product.setMaterial(material.get());
            }

            if (sizes.isPresent()) {
                product.setSize(sizes.get());
            }
            if (collections.isPresent()) {
                product.setCollections(collections.get());
            }
            product.setId(productRequest.getId());
            product.setCategoryId(category.getId());
            product.setName(productRequest.getName());
            product.setContent(productRequest.getContent());
            product.setDesc(productRequest.getDesc());
            product.setStatus(productRequest.getStatus());
            product.setPerDiscount(productRequest.getPerDiscount());
            product.setPriceRef(productRequest.getPriceRef());
            product.setPriceSale(productRequest.getPriceSale());
            productRepository.save(product);
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }
    }

    @Override
    public Product findById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        return product;
    }
}
