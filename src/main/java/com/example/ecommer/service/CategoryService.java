package com.example.ecommer.service;

import com.example.ecommer.dto.Node;
import com.example.ecommer.model.Category;
import com.example.ecommer.model.CategoryRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {

    List<Category> listCategory();

    Page<Category> findListCategoryPage(Integer pageNo, Integer limit, String keyword);

    void saveCategory(CategoryRequest category);

    void delete(Long id);

    void update(Category category);

    Category findById(Long id);

//    List<Node> categoryWithIndent();

//    List<Node> buildTreeAndGetRoots(List<Category> categoryList);
}
