package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Category;
import com.example.ecommer.model.Collections;
import com.example.ecommer.repository.CategoryRepository;
import com.example.ecommer.repository.CollectionsRepository;
import com.example.ecommer.service.CollectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CollectionsServiceImpl implements CollectionsService {

    @Autowired
    private CollectionsRepository collectionsRepository;

    @Autowired
    private CategoryRepository categoryRepository;



    @Override
    public List<Collections> listCollections() {
        return collectionsRepository.findAll();
    }

    @Override
    public void saveCollections(Collections collections) {
        Collections col = new Collections();
        col.setName(collections.getName());
        col.setCategories(collections.getCategories());
        collectionsRepository.save(col);
    }

    @Override
    public void delete(Long id) {
        Optional<Collections> collections = collectionsRepository.findById(id);
        if(collections.isPresent()){
            collectionsRepository.deleteById(id);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }

    }

    @Override
    public void update(Collections collections) {
        Optional<Collections> collect = collectionsRepository.findById(collections.getId());
        if(collect.isPresent()){
            collect.get().setName(collections.getName());
            collect.get().setCategories(collections.getCategories());
            collectionsRepository.save(collect.get());
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }
    }

    @Override
    public Collections findById(Long id) {
        return collectionsRepository.findById(id).orElseThrow(() ->  new CustomException(ErrorCode.NOT_FOUND));
    }

    @Override
    public List<Collections> findByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CATEGORY));
        return collectionsRepository.findByCategoryId(category.getId());
    }
}
