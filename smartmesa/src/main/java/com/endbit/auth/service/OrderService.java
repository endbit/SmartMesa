package com.endbit.auth.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endbit.auth.dto.OrderItemDTO;
import com.endbit.auth.model.Order;
import com.endbit.auth.model.OrderItem;
import com.endbit.auth.model.TableSession;
import com.endbit.auth.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TableSessionService sessionService;

    public Order createOrder(
            String sessionToken,
            List<OrderItemDTO> items,
            Double totalPrice
    ) {

        TableSession session = sessionService.findByToken(sessionToken);

        Order order = new Order();
        order.setSession(session);
        order.setTableNumber(session.getTable().getNumber());
        order.setCustomerName("Cliente");
        order.setTotalPrice(totalPrice);

        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemDTO item : items) {

            OrderItem oi = new OrderItem();
            oi.setProductName(item.getProductName());
            oi.setQuantity(item.getQuantity());
            oi.setPrice(item.getPrice());
            oi.setOrder(order);

            orderItems.add(oi);
        }

        order.setItems(orderItems);

        return orderRepository.save(order);
    }
}