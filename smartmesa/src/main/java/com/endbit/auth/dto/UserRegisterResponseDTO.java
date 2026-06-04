package com.endbit.auth.dto;

import java.util.List;

import com.endbit.auth.model.Role;

import lombok.Data;

@Data
public class UserRegisterResponseDTO {
    private Long id;
    private String username;
    private boolean active;
    private List<Role> roles;
}
