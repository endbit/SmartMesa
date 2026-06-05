package com.endbit.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.endbit.auth.enums.OrderStatus;
import com.endbit.auth.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(
            Integer orderNumber);

    List<Order> findByTableNumber(
            Integer tableNumber);

    List<Order> findByStatus(
            OrderStatus status);

    Optional<Order> findByTableNumberAndStatus(
            Integer tableNumber,
            OrderStatus status);

    boolean existsByTableNumberAndStatus(
            Integer tableNumber,
            OrderStatus status);
}