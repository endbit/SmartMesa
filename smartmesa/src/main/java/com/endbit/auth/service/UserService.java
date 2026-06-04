package com.endbit.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.endbit.auth.dto.UserLoginRequestDTO;
import com.endbit.auth.dto.UserRegisterRequestDTO;
import com.endbit.auth.dto.UserRegisterResponseDTO;
import com.endbit.auth.model.User;
import com.endbit.auth.repository.UserRepository;
import com.endbit.auth.security.TokenService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    /* findByUsername */
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        return user;
    }

    /* Registro */
    public UserRegisterResponseDTO register(UserRegisterRequestDTO userRequestDTO) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String passwordHash = encoder.encode(userRequestDTO.getPassword());

        User user = new User();
        user.setActive(true);
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(passwordHash);
        user.setRoles(userRequestDTO.getRoles());

        User savedUser = userRepository.save(user);
        System.out.println(savedUser);

        UserRegisterResponseDTO userResponseDTO = new UserRegisterResponseDTO();
        userResponseDTO.setId(savedUser.getId());
        userResponseDTO.setRoles(savedUser.getRoles());
        userResponseDTO.setUsername(savedUser.getUsername());
        userResponseDTO.setActive(savedUser.isActive());

        return userResponseDTO;
    }

    /* Login */
    public String login(UserLoginRequestDTO dto) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = findByUsername(dto.getUsername());

        if (user != null && encoder.matches(dto.getPassword(), user.getPassword())) {
            return tokenService.generateToken(user);
        }
        throw new RuntimeException("Credenciais inválidas");
    }

}
