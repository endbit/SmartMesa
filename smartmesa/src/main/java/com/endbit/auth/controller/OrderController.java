package com.endbit.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.endbit.auth.dto.OrderRequestDTO;
import com.endbit.auth.model.Order;
import com.endbit.auth.repository.OrderRepository;
import com.endbit.auth.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private OrderRepository orderRepository;

    // 📦 CRIAR PEDIDO + NOTIFICAR COZINHA
    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderRequestDTO payload) {

        Order order = orderService.createOrder(
                payload.getSessionToken(),
                payload.getItems(),
                payload.getTotalPrice()
        );

        // 🔔 WebSocket realtime
        messagingTemplate.convertAndSend("/topic/orders", order);

        return ResponseEntity.ok(order);
    }

    // 📋 LISTAR TODOS OS PEDIDOS (TELA ADMIN)
    @GetMapping
    public ResponseEntity<List<Order>> findAll() {
        List<Order> orders = orderRepository.findAll();
        return ResponseEntity.ok(orders);
    }
}