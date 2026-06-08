package com.endbit.auth.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private String productName;
    private Integer quantity;
    private Double price;
}