package com.example.ecommer.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileManagerService {
    String upload(String pathUpload, MultipartFile file);
    boolean delete(String pathDelete);
    ResponseEntity<InputStreamResource> download (String filePath);
}
