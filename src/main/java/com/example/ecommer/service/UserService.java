package com.example.ecommer.service;

import com.example.ecommer.model.User;
import org.springframework.data.domain.Page;

public interface UserService {

    Page<User> findListUserPage(Integer pageNo, Integer limit, String keyword, Integer roleId);

    User findByUserId(Long id);


}
