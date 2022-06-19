package com.example.ecommer.repository;

import com.example.ecommer.constant.ERole;
import com.example.ecommer.model.Role;
import com.example.ecommer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByType(ERole name);
}
