package com.endbit.auth.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequestDTO {

    private String sessionToken;
    private Double totalPrice;
    private List<OrderItemDTO> items;
}