package com.endbit.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.endbit.auth.model.Product;
import com.endbit.auth.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        Product product = productService.findById(id);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Product> insertNew(@RequestBody Product product) {

        System.out.println("PRODUTO RECEBIDO:");
        System.out.println("Nome = " + product.getNome());
        System.out.println("Descricao = " + product.getDescricao());
        System.out.println("Preco = " + product.getPreco());

        if (product.getCategory() != null) {
            System.out.println("Categoria ID = " + product.getCategory().getId());
        }

        Product newProduct = productService.insertNew(product);

        return ResponseEntity.ok(newProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(
            @PathVariable Long id,
            @RequestBody Product productInserido) {

        Product productAtualizado = productService.update(id, productInserido);

        if (productAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(productAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteById(@PathVariable Long id) {

        boolean deleted = productService.deleteById(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(true);
    }
}