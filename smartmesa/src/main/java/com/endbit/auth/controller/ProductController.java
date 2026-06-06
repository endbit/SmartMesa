package com.endbit.auth.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.endbit.auth.config.FileStorageController;
import com.endbit.auth.model.Category;
import com.endbit.auth.model.Product;
import com.endbit.auth.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileStorageController fileStorageController;

    // 🔥 LISTAR TODOS
    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    // 🔥 BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {

        Product product = productService.findById(id);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(product);
    }

    // 🔥 CRIAR PRODUTO + IMAGEM (1 FORM SÓ)
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Product> insertNew(
            @RequestParam String nome,
            @RequestParam String descricao,
            @RequestParam BigDecimal preco,
            @RequestParam Long categoryId,
            @RequestParam(required = false) MultipartFile image) {

        try {

            System.out.println("PRODUTO RECEBIDO:");
            System.out.println("Nome = " + nome);
            System.out.println("Descricao = " + descricao);
            System.out.println("Preco = " + preco);
            System.out.println("Categoria ID = " + categoryId);

            Product product = new Product();
            product.setNome(nome);
            product.setDescricao(descricao);
            product.setPreco(preco);

            Category category = new Category();
            category.setId(categoryId);

            product.setCategory(category);

            // 🔥 se veio imagem, salva usando mesma lógica do FileStorageController
            if (image != null && !image.isEmpty()) {

                String fileName = System.currentTimeMillis() + "_"
                        + StringUtils.cleanPath(image.getOriginalFilename());

                Path uploadDir = Path.of("uploads").toAbsolutePath().normalize();
                java.nio.file.Files.createDirectories(uploadDir);

                Path targetLocation = uploadDir.resolve(fileName);

                image.transferTo(targetLocation);

                String imageUrl = ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path("/files/download/")
                        .path(fileName)
                        .toUriString();

                product.setImageUrl(imageUrl);
            }

            Product newProduct = productService.insertNew(product);

            return ResponseEntity.ok(newProduct);

        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 🔥 UPDATE
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

    // 🔥 DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteById(@PathVariable Long id) {

        boolean deleted = productService.deleteById(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(true);
    }
}