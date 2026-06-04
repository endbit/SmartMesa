package com.endbit.auth.dto;

import java.util.List;

import com.endbit.auth.model.Role;

import lombok.Data;

@Data
public class UserRegisterRequestDTO {
    private String username;
    private String password;
    private List<Role> roles;
}
