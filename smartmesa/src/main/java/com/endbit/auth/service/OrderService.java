package com.endbit.auth.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endbit.auth.enums.OrderStatus;
import com.endbit.auth.model.Order;
import com.endbit.auth.model.TableEntity;
import com.endbit.auth.repository.OrderRepository;
import com.endbit.auth.repository.TableRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TableRepository tableRepository;

    /*
     * =========================
     * LISTAR TODOS
     * ==========================
     */
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    /*
     * =========================
     * BUSCAR POR ID
     * ==========================
     */
    public Order findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    /*
     * =========================
     * PEDIDO ABERTO DA MESA
     * ==========================
     */
    public Optional<Order> findActiveOrderByTable(
            Integer tableNumber) {

        return orderRepository
                .findByTableNumberAndStatus(
                        tableNumber,
                        OrderStatus.OPEN);
    }

    /*
     * =========================
     * ABRIR PEDIDO (CLIENTE)
     * ==========================
     */
    public Order openOrder(
            String customerName,
            Integer tableNumber) {

        if (tableNumber == null) {
            throw new RuntimeException(
                    "Mesa não informada");
        }

        TableEntity table = tableRepository
                .findByNumber(tableNumber)
                .orElseThrow(() -> new RuntimeException(
                        "Mesa não encontrada"));

        boolean hasOpenOrder = orderRepository.existsByTableNumberAndStatus(
                tableNumber,
                OrderStatus.OPEN);

        if (hasOpenOrder) {
            return orderRepository
                    .findByTableNumberAndStatus(
                            tableNumber,
                            OrderStatus.OPEN)
                    .orElseThrow();
        }

        Order order = new Order();

        order.setCustomerName(customerName);
        order.setTableNumber(tableNumber);
        order.setStatus(OrderStatus.OPEN);

        Order savedOrder = orderRepository.save(order);

        table.setOccupied(true);
        table.setOccupiedAt(LocalDateTime.now());

        tableRepository.save(table);

        return savedOrder;
    }

    /*
     * =========================
     * CRIAÇÃO MANUAL (ADMIN)
     * ==========================
     */
    public Order create(Order order) {

        if (order.getTableNumber() == null) {
            throw new RuntimeException(
                    "Número da mesa é obrigatório");
        }

        TableEntity table = tableRepository
                .findByNumber(order.getTableNumber())
                .orElseThrow(() -> new RuntimeException(
                        "Mesa não encontrada"));

        boolean hasOpenOrder = orderRepository.existsByTableNumberAndStatus(
                table.getNumber(),
                OrderStatus.OPEN);

        if (hasOpenOrder) {
            throw new RuntimeException(
                    "Já existe um pedido aberto para esta mesa");
        }

        order.setStatus(OrderStatus.OPEN);

        Order savedOrder = orderRepository.save(order);

        table.setOccupied(true);

        if (table.getOccupiedAt() == null) {
            table.setOccupiedAt(LocalDateTime.now());
        }

        tableRepository.save(table);

        return savedOrder;
    }

    /*
     * =========================
     * FECHAR PEDIDO
     * ==========================
     */
    public Order closeOrder(Long id) {

        Order order = findById(id);

        if (order.getStatus() == OrderStatus.CLOSED) {
            return order;
        }

        order.setStatus(OrderStatus.CLOSED);

        Order savedOrder = orderRepository.save(order);

        TableEntity table = tableRepository
                .findByNumber(order.getTableNumber())
                .orElseThrow(() -> new RuntimeException(
                        "Mesa não encontrada"));

        table.setOccupied(false);
        table.setOccupiedAt(null);

        tableRepository.save(table);

        return savedOrder;
    }

    /*
     * =========================
     * PEDIDOS ABERTOS
     * ==========================
     */
    public List<Order> findOpenOrders() {
        return orderRepository.findByStatus(
                OrderStatus.OPEN);
    }

    /*
     * =========================
     * PEDIDOS FECHADOS
     * ==========================
     */
    public List<Order> findClosedOrders() {
        return orderRepository.findByStatus(
                OrderStatus.CLOSED);
    }

    /*
     * =========================
     * PEDIDOS DA MESA
     * ==========================
     */
    public List<Order> findByTable(
            Integer tableNumber) {

        return orderRepository.findByTableNumber(
                tableNumber);
    }

    /*
     * =========================
     * EXCLUIR
     * ==========================
     */
    public void delete(Long id) {

        Order order = findById(id);

        if (order.getStatus() == OrderStatus.OPEN) {
            throw new RuntimeException(
                    "Feche o pedido antes de excluir");
        }

        orderRepository.delete(order);
    }

}