package com.endbit.auth.security;

import java.util.Date;

import org.springframework.context.annotation.Configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.endbit.auth.model.User;

@Configuration
public class TokenService {

    public String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withArrayClaim("roles", user.getRoles().stream()
                        .map(Enum::name)
                        .toArray(String[]::new))
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000)) // 1h
                .sign(Algorithm.HMAC256("segredo"));
    }
}
