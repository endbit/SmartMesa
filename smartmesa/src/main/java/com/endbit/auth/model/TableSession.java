package com.endbit.auth.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_table_session")
@Data
@NoArgsConstructor
public class TableSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Mesa vinculada à sessão
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "table_id")
    private TableEntity table;

    /**
     * Token único da sessão (usado no front/QR dinâmico)
     */
    @Column(nullable = false, unique = true)
    private String sessionToken;

    /**
     * Status da sessão (ativa ou encerrada)
     */
    @Column(nullable = false)
    private Boolean active = true;

    /**
     * Quando a sessão foi aberta
     */
    @Column(nullable = false)
    private LocalDateTime openedAt;

    /**
     * Quando a sessão foi encerrada
     */
    private LocalDateTime closedAt;

    /**
     * Última atividade (opcional mas MUITO útil)
     */
    private LocalDateTime lastActivityAt;
}