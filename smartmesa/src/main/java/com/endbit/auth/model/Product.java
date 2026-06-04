package com.endbit.auth.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    private Long estoque;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}