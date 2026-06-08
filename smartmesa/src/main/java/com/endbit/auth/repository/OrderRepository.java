package com.endbit.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.endbit.auth.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}