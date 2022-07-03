package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.Node;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Category;
import com.example.ecommer.model.CategoryRequest;
import com.example.ecommer.repository.CategoryRepository;
import com.example.ecommer.service.CategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository  categoryRepository;

    @Override
    public List<Category> listCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> findListCategoryPage(Integer pageNo, Integer limit, String keyword) {
        return null;
    }

    @Override
    public void saveCategory(CategoryRequest category) {
        System.out.println(category);
        Category c = new Category();
        c.setParentId(category.getParentId());
        c.setName(category.getName());
        c.setTitle(category.getTitle());
        c.setContent(category.getContent());
        c.setDesc(category.getDesc());
        categoryRepository.save(c);
    }

    @Override
    public void delete(Long id) {
        Category user = categoryRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        if (user != null) {
            categoryRepository.deleteById(id);
        }
        else {
            throw new CustomException(ErrorCode.API_FAIL_UNKNOW);
        }
    }

    @Override
    public void update(Category category) {
        Category categoryExit = categoryRepository.findById(category.getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        categoryExit.setName(category.getName());
        categoryExit.setTitle(category.getTitle());
        categoryExit.setContent(category.getContent());
        categoryExit.setDesc(category.getDesc());
        categoryRepository.save(categoryExit);
    }

    @Override
    public Category findById(Integer id) {
        Category categoryExit = categoryRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        return categoryExit;
    }
}
