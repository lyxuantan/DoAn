package com.example.ecommer.service;

import com.example.ecommer.model.Collections;
import com.example.ecommer.model.Color;
import com.example.ecommer.model.Sizes;

import java.util.List;

public interface FilterService {

    List<Collections> listCollections();

    void saveCollections(Collections collections);

    void delete(Long id);

    void update(Collections collections);

    Collections findById(Long id);

    List<Collections> findByCategory(Long category);

    List<Color> listColor();

    void saveColor(Color color);

    void deleteColor(Long id);

    void updateColor(Color color);

    List<Sizes> listSize();

    void saveSize(Sizes sizes);

    void deleteSize(Long id);

    void updateSize(Sizes color);

}
