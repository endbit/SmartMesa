package com.endbit.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.endbit.auth.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.session.sessionToken = :sessionToken")
    List<Order> findBySessionToken(@Param("sessionToken") String sessionToken);
}