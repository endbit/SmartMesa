package com.endbit.auth.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.endbit.auth.model.TableEntity;
import com.endbit.auth.model.TableSession;
import com.endbit.auth.repository.TableSessionRepository;

@Service
public class TableSessionService {

    @Autowired
    private TableSessionRepository sessionRepository;

    /**
     * Abre ou reutiliza sessão ativa da mesa
     */
    @Transactional
    public TableSession openOrGetSession(TableEntity table) {

        return sessionRepository
                .findByTableIdAndActiveTrue(table.getId())
                .orElseGet(() -> createSession(table));
    }

    /**
     * Cria nova sessão para mesa
     */
    private TableSession createSession(TableEntity table) {

        TableSession session = new TableSession();

        session.setTable(table);
        session.setSessionToken(generateToken());
        session.setActive(true);
        session.setOpenedAt(LocalDateTime.now());
        session.setLastActivityAt(LocalDateTime.now());

        return sessionRepository.save(session);
    }

    /**
     * Fecha sessão ativa da mesa
     */
    @Transactional
    public TableSession closeSession(Long tableId) {

        TableSession session = sessionRepository
                .findByTableIdAndActiveTrue(tableId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));

        session.setActive(false);
        session.setClosedAt(LocalDateTime.now());

        return sessionRepository.save(session);
    }

    /**
     * Atualiza atividade da sessão (importante p/ timeout futuro)
     */
    @Transactional
    public void touch(String sessionToken) {

        TableSession session = sessionRepository
                .findBySessionToken(sessionToken)
                .orElseThrow(() -> new RuntimeException("Sessão inválida"));

        session.setLastActivityAt(LocalDateTime.now());

        sessionRepository.save(session);
    }

    /**
     * Busca sessão por token
     */
    public TableSession findByToken(String token) {

        return sessionRepository
                .findBySessionToken(token)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));
    }

    /**
     * Gera token único da sessão
     */
    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}