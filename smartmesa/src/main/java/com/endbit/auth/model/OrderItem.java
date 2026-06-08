package com.endbit.auth.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nome do produto no momento do pedido
     * (snapshot — não depende mais do produto original)
     */
    @Column(nullable = false)
    private String productName;

    /**
     * Quantidade pedida
     */
    @Column(nullable = false)
    private Integer quantity;

    /**
     * Preço unitário no momento do pedido
     * (IMPORTANTE: não mudar depois)
     */
    @Column(nullable = false)
    private Double price;

    /**
     * Total do item (quantity * price)
     */
    @Column(nullable = false)
    private Double total;

    /**
     * Relacionamento com Order
     */
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    /**
     * Calcula total automaticamente antes de salvar
     */
    @PrePersist
    public void calculateTotal() {
        if (this.total == null && this.price != null && this.quantity != null) {
            this.total = this.price * this.quantity;
        }
    }
}