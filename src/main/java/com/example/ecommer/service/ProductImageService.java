package com.example.ecommer.service;

import com.example.ecommer.dto.request.ProductImageRequest;
import com.example.ecommer.model.ProductImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductImageService {

    List<ProductImage> saveFile(MultipartFile[] file, Long productImageRequest, Boolean isPresident) throws IOException;

    ProductImage save(ProductImage fileManager);

    String upload(String pathUpload, MultipartFile file);

    ProductImage getFile(Long id);
}
