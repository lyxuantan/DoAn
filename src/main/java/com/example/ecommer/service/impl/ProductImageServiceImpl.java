package com.example.ecommer.service.impl;

import com.example.ecommer.constant.ErrorCode;
import com.example.ecommer.dto.request.ProductImageRequest;
import com.example.ecommer.exception.CustomException;
import com.example.ecommer.model.Product;
import com.example.ecommer.model.ProductImage;
import com.example.ecommer.repository.ProductImageRepository;
import com.example.ecommer.repository.ProductRepository;
import com.example.ecommer.service.ProductImageService;
import com.example.ecommer.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final Path root = Paths.get("uploads");

    @Autowired
    private ServletContext servletContext;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductRepository productRepository;


    @Override
    public List<ProductImage> saveFile(MultipartFile[] files, Long productId, Boolean isPresident) throws IOException {
        List<ProductImage> productImages = new ArrayList<>();

        Optional<Product> product = productRepository.findById(productId);


        for (MultipartFile file : files) {

            if (Objects.requireNonNull(file.getOriginalFilename()).matches("^.*\\.(jpg|jpeg|png||PNG|JPG|JPEG)$")) {
                ProductImage productImage = new ProductImage();
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                if (file.getOriginalFilename().matches("^.*\\.(jpg|jpeg|png||PNG|JPG|JPEG)$")) {
//                    if(product.isPresent()) {
                        productImage.setProductId(productId);
//                    }
//                    else {
//                        throw new CustomException(ErrorCode.NOT_FOUND_PRODUCT);
//                    }
                    productImage.setFile(upload("uploads/doc", file));

                    productImage.setName(fileName);
                    productImage.setIsPresident(isPresident);
                    productImage = save(productImage);
                    productImages.add(productImage);
                }
            } else {
                throw new CustomException(ErrorCode.UPLOAD_IMAGE_INVALID);
            }
        }
        return productImages;
    }

    @Override
    public ProductImage save(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }

    @Override
    public String upload(String pathUpload, MultipartFile file) {
        LocalDate localDate = LocalDate.now();

        StringBuilder pathName = new StringBuilder(pathUpload);
        pathName.append("/" + localDate.getYear());
        pathName.append("/" + localDate.getMonthValue());

        Path path = Paths.get(pathName.toString());

        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        StringUtil stringUtil = new StringUtil(
                Objects.requireNonNull(file.getOriginalFilename()).substring(0, file.getOriginalFilename().lastIndexOf("."))
        );
        String nameFile = stringUtil.toSlug() + "-" + stringUtil.getAlphaNumericString(10)
                + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        String pathFile = pathName.toString() + "/" + nameFile;


        try {
            Files.copy(file.getInputStream(), path.resolve(nameFile),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "/" + pathFile;
    }

    @Override
    public ProductImage getFile(Long id) {
        return productImageRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
    }
}
