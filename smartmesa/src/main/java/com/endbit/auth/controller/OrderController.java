package com.endbit.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.endbit.auth.dto.OrderRequestDTO;
import com.endbit.auth.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderRequestDTO payload) {

        var order = orderService.createOrder(
                payload.getSessionToken(),
                payload.getItems(),
                payload.getTotalPrice()
        );

        return ResponseEntity.ok(order);
    }
}