package com.endbit.auth.controller;

import java.util.List;
import java.util.Map;

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
                payload.getCustomerName(),
                payload.getItems(),
                payload.getTotalPrice());

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

    @GetMapping("/session/{sessionToken}")
    public ResponseEntity<List<Order>> findBySession(@PathVariable String sessionToken) {

        List<Order> orders = orderRepository.findBySessionToken(sessionToken);

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/session/{sessionToken}/summary")
public ResponseEntity<?> summary(@PathVariable String sessionToken) {

    List<Order> orders = orderRepository.findBySessionToken(sessionToken);

    double total = orders.stream()
            .mapToDouble(Order::getTotalPrice)
            .sum();

    return ResponseEntity.ok(Map.of(
            "orders", orders,
            "total", total
    ));
}
}