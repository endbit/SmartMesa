package com.endbit.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.endbit.auth.model.TableEntity;

public interface TableRepository extends JpaRepository<TableEntity, Long> {
    Optional<TableEntity> findByNumber(Integer number);
    Optional<TableEntity> findByToken(String token);
}