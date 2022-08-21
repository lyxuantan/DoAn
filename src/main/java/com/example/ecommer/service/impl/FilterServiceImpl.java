package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.CollectionRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Category;
import com.example.ecommer.model.Collections;
import com.example.ecommer.model.Color;
import com.example.ecommer.model.Sizes;
import com.example.ecommer.repository.*;
import com.example.ecommer.service.FilterService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilterServiceImpl implements FilterService {

    @Autowired
    private CollectionsRepository collectionsRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private SizesRepository sizesRepository;


    @Override
    public List<Collections> listCollections() {
        return collectionsRepository.findAll();
    }

    @Override
    public void saveCollections(CollectionRequest collections) {
        Collections col = new Collections();

        if(!collectionsRepository.existsCollectionsByNameAndCategoryId(collections.getName(), collections.getCategoryId())) {
            if(StringUtils.isEmpty(collections.getName())) {
                throw new CustomException(ErrorCode.COLLECTION_NAME_INVALID);
            }
            else {
                col.setName(collections.getName());
//                Optional<Category> category = categoryRepository.findById(collections.getCategoryId());
//                if(category.isPresent()) {
                    col.setCategoryId(collections.getCategoryId());
//                }
                collectionsRepository.save(col);
            }
        }
        else {
            throw new CustomException(ErrorCode.COLLECTION_EXITS);
        }
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

    @Override
    public List<Color> listColor() {
        return colorRepository.findAll();
    }

    @Override
    public void saveColor(Color color) {
        Color c = new Color();
        c.setName(color.getName());
        c.setHex(color.getHex());
        colorRepository.save(color);
    }

    @Override
    public void deleteColor(Long id) {
        Optional<Color> color = colorRepository.findById(id);
        if(color.isPresent()){
            colorRepository.deleteById(id);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }
    }

    @Override
    public void updateColor(Color  color) {
        Optional<Color> c = colorRepository.findById(color.getId());
        if(c.isPresent()){
            c.get().setName(color.getName());
            c.get().setHex(color.getHex());
            colorRepository.save(c.get());
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }
    }

    @Override
    public List<Sizes> listSize() {
        return sizesRepository.findAll();
    }

    @Override
    public void saveSize(Sizes sizes) {
        Sizes s = new Sizes();
        s.setName(sizes.getName());
        sizesRepository.save(s);
    }

    @Override
    public void deleteSize(Long id) {
        Optional<Sizes> s = sizesRepository.findById(id);
        if(s.isPresent()){
           sizesRepository.deleteById(id);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }
    }

    @Override
    public void updateSize(Sizes sizes) {
        Optional<Sizes> s = sizesRepository.findById(sizes.getId());
        if(s.isPresent()){
            s.get().setName(sizes.getName());
            sizesRepository.save(s.get());
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }
    }
}
