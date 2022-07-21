package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.FilterProductRequest;
import com.example.ecommer.dto.request.ProductRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.*;
import com.example.ecommer.repository.*;
import com.example.ecommer.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

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


    public boolean checkFilterPriceValid(Long priceFrom, Long priceTo) {
        if (priceFrom == null || priceTo == null) {
            return false;
        }
        if (priceFrom < priceTo) {
            return false;
        }
        return true;
    }

    @Override
    public Page<Product> findListProductPage(FilterProductRequest filterProductRequest) {
        PageRequest pageable = PageRequest.of(Math.toIntExact(filterProductRequest.getPageNo() - 1), Math.toIntExact(filterProductRequest.getPageSize()), filterProductRequest.getDirection().equals("DESC") ? Sort.by(filterProductRequest.getOrderBy()).descending() : Sort.by(filterProductRequest.getOrderBy()).ascending());
        if (filterProductRequest.getIsBestSell().equals(false)) {
            if (filterProductRequest.getCollections().size() != 0 || filterProductRequest.getColors().size() != 0 || filterProductRequest.getSize().size() != 0 || filterProductRequest.getMaterial().size() != 0) {
                logger.info("Creating Token for user : {}", filterProductRequest);
                return productRepository.findPageProductFilter(filterProductRequest.getPriceFrom(), filterProductRequest.getPriceTo(), filterProductRequest.getCollections(), filterProductRequest.getSize(), filterProductRequest.getColors(), filterProductRequest.getMaterial(), filterProductRequest.getCategoryId(),pageable);
            } else {
                logger.info("69 : {}", filterProductRequest);
                return productRepository.findAllByCategoryId(filterProductRequest.getCategoryId(), pageable);
            }
        } else {
            logger.info("72 : {}", filterProductRequest);
            if(filterProductRequest.getParentCategoryId() != null ||  !filterProductRequest.getKeyword().trim().isEmpty()) {
                Set<Long> listCategoryId = new HashSet<>();
                List<Category> categoryList = categoryRepository.findByParentId(filterProductRequest.getParentCategoryId());
                categoryList.forEach(a -> {
                            listCategoryId.add(filterProductRequest.getParentCategoryId());
                            listCategoryId.add(a.getId());

                        }
                );
                logger.info("categoryList : {}", categoryList);

                return productRepository.findAllByCategory(listCategoryId, filterProductRequest.getKeyword(), pageable);
            }
            else {
                logger.info("findAllByKeyword : {}");
                return productRepository.findAllByKeyword(pageable);
            }
        }
    }

    @Override
    public void saveProduct(Product productRequest) {
        Product product = new Product();
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CATEGORY));
        if(productRequest.getColorId() != null) {
            Optional<Color> color = colorRepository.findById(productRequest.getColorId());
            if (color.isPresent()) {
                product.setColors(color.get());
            }
        }
        if(product.getSizeId() != null) {
            Optional<Sizes> sizes = sizesRepository.findById(productRequest.getSizeId());
            if (sizes.isPresent()) {
                product.setSize(sizes.get());
            }
        }

        if(product.getCollections() != null) {
            Optional<Collections> collections = collectionsRepository.findById(productRequest.getCollectionId());
            if (collections.isPresent()) {
                product.setCollections(collections.get());
            }
        }
        product.setCategoryId(category.getId());
        product.setName(productRequest.getName());
        product.setContent(productRequest.getContent());
        product.setDesc(productRequest.getDesc());
        product.setStatus(productRequest.getStatus());
        product.setTotal(productRequest.getTotal());
        product.setPerDiscount(productRequest.getPerDiscount());
        product.setPriceRef(productRequest.getPriceRef());
        product.setPriceSale(calculatePriceSale(productRequest));
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
    public void update(Product productRequest) {
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
            product.setTotal(productRequest.getTotal());
            product.setStatus(productRequest.getStatus());
            product.setPerDiscount(productRequest.getPerDiscount());
            product.setPriceRef(productRequest.getPriceRef());
            product.setPriceSale(calculatePriceSale(productRequest));
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

    public Float calculatePriceSale(Product product) {
        return product.getPriceRef() + product.getPriceRef() * product.getPerDiscount() / 100;
    }
}
