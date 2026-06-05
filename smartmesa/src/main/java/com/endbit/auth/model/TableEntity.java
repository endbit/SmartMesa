package com.endbit.auth.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_tables")
@Data
@NoArgsConstructor
public class TableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private Integer number;

    @Column(unique = true)
    private String token;

    /**
     * Mesa ativa/inativa no sistema
     */
    private Boolean active = true;

    /**
     * Indica se existe atendimento em andamento
     */
    @Column(nullable = false)
    private Boolean occupied = false;

    /**
     * Momento em que a mesa foi ocupada
     */
    private LocalDateTime occupiedAt;
}