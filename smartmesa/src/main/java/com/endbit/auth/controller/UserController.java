package com.endbit.auth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endbit.auth.dto.UserLoginRequestDTO;
import com.endbit.auth.dto.UserRegisterRequestDTO;
import com.endbit.auth.dto.UserRegisterResponseDTO;
import com.endbit.auth.service.UserService;

@RestController
@RequestMapping("/auth")

public class UserController {
    @Autowired
    private UserService userService;

    /* Registar */
    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponseDTO> registrar(@RequestBody UserRegisterRequestDTO user) {
        UserRegisterResponseDTO userSalvo = userService.register(user);
        return ResponseEntity.ok().body(userSalvo);
    }

    /* Login */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDTO user) {
        try {
            String token = userService.login(user);
            return ResponseEntity.ok(Map.of("token", token));

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", "Credenciais inválidas"));
        }
    }
}
