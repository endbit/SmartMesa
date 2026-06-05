package com.endbit.auth.model;

import java.util.concurrent.ThreadLocalRandom;

import com.endbit.auth.enums.OrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false)
    private Integer orderNumber;

    private String customerName;

    /**
     * Número da mesa vinculada ao pedido
     */
    private Integer tableNumber;

    /**
     * Status do pedido
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.OPEN;

    @PrePersist
    public void generateOrderNumber() {

        if (this.orderNumber == null) {
            this.orderNumber = generateNextOrderNumber();
        }

        if (this.status == null) {
            this.status = OrderStatus.OPEN;
        }
    }

    private Integer generateNextOrderNumber() {
        return ThreadLocalRandom.current()
                .nextInt(1000, 10000);
    }
}