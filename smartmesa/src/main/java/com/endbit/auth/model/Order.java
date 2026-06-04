package com.endbit.auth.model;

import java.util.concurrent.ThreadLocalRandom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    private Integer tableNumber;

    @PrePersist
    public void generateOrderNumber() {
        this.orderNumber = generateNextOrderNumber();
    }

    private Integer generateNextOrderNumber() {
        return ThreadLocalRandom.current()
                .nextInt(1000, 10000);
    }
}