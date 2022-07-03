package com.example.ecommer.service;

import com.example.ecommer.model.Collections;

import java.util.List;

public interface CollectionsService {

    List<Collections> listCollections();

    void saveCollections(Collections collections);

    void delete(Long id);

    void update(Collections collections);

    Collections findById(Long id);

    List<Collections> findByCategory(Long category);

}
