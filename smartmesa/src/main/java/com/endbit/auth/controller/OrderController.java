package com.endbit.auth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.endbit.auth.model.Order;
import com.endbit.auth.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /*
     * =========================
     * LISTAR TODOS
     * ==========================
     */
    @GetMapping
    public ResponseEntity<List<Order>> findAll() {
        return ResponseEntity.ok(
                orderService.findAll());
    }

    /*
     * =========================
     * BUSCAR POR ID
     * ==========================
     */
    @GetMapping("/{id}")
    public ResponseEntity<Order> findById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                orderService.findById(id));
    }

    /*
     * =========================
     * PEDIDOS ABERTOS
     * ==========================
     */
    @GetMapping("/open")
    public ResponseEntity<List<Order>> findOpenOrders() {

        return ResponseEntity.ok(
                orderService.findOpenOrders());
    }

    /*
     * =========================
     * PEDIDOS FECHADOS
     * ==========================
     */
    @GetMapping("/closed")
    public ResponseEntity<List<Order>> findClosedOrders() {

        return ResponseEntity.ok(
                orderService.findClosedOrders());
    }

    /*
     * =========================
     * PEDIDO ABERTO DA MESA
     * ==========================
     */
    @GetMapping("/table/{tableNumber}/active")
    public ResponseEntity<?> findActiveOrderByTable(
            @PathVariable Integer tableNumber) {

        return orderService
                .findActiveOrderByTable(tableNumber)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404)
                        .body(
                                Map.of(
                                        "message",
                                        "Nenhum pedido aberto encontrado")));
    }

    /*
     * =========================
     * HISTÓRICO DA MESA
     * ==========================
     */
    @GetMapping("/table/{tableNumber}")
    public ResponseEntity<List<Order>> findByTable(
            @PathVariable Integer tableNumber) {

        return ResponseEntity.ok(
                orderService.findByTable(tableNumber));
    }

    /*
     * =========================
     * ABRIR PEDIDO (CLIENTE)
     * Marca mesa como ocupada
     * ==========================
     */
    @PostMapping("/open")
    public ResponseEntity<Order> openOrder(
            @RequestBody Order order) {

        return ResponseEntity.ok(
                orderService.openOrder(
                        order.getCustomerName(),
                        order.getTableNumber()));
    }

    /*
     * =========================
     * CRIAR PEDIDO (ADMIN)
     * ==========================
     */
    @PostMapping
    public ResponseEntity<Order> create(
            @RequestBody Order order) {

        return ResponseEntity.ok(
                orderService.create(order));
    }

    /*
     * =========================
     * FECHAR PEDIDO
     * Libera mesa automaticamente
     * ==========================
     */
    @PatchMapping("/{id}/close")
    public ResponseEntity<Order> closeOrder(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                orderService.closeOrder(id));
    }

    /*
     * =========================
     * REMOVER PEDIDO
     * ==========================
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id) {

        orderService.delete(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Pedido removido com sucesso"));
    }
}