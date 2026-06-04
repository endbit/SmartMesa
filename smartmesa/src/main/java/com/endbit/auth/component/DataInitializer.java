package com.endbit.auth.component;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.endbit.auth.model.Role;
import com.endbit.auth.model.User;
import com.endbit.auth.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setActive(true);
            admin.setRoles(List.of(Role.ADMIN));

            userRepository.save(admin);

            System.out.println("✅ Admin inicial criado!");
        }
    }
}
