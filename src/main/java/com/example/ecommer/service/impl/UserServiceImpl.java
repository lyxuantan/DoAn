//package com.example.ecommer.service.impl;
//
//import com.example.ecommer.model.User;
//import com.example.ecommer.repository.UserRepository;
//import com.example.ecommer.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//public class UserServiceImpl implements UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//
//    @Override
//    public Page<User> findListUserPage(Integer pageNo, Integer limit, String keyword, Integer roleId) {
//        PageRequest pageable = PageRequest.of(pageNo - 1, limit, Sort.by("id").ascending());
//        if (roleId == 0) {
//            return userRepository.findAllUserPage(keyword, pageable);
//        }
//        return userRepository.findListUserPage(keyword, roleId, pageable);    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return null;
//    }
//}
