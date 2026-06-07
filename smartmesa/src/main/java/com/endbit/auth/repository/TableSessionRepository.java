package com.endbit.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.endbit.auth.model.TableSession;

@Repository
public interface TableSessionRepository extends JpaRepository<TableSession, Long> {

    /**
     * Busca sessão ativa de uma mesa
     */
    Optional<TableSession> findByTableIdAndActiveTrue(Long tableId);

    /**
     * Busca por token da sessão (usado no front/QR)
     */
    Optional<TableSession> findBySessionToken(String sessionToken);
}