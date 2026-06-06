package com.endbit.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endbit.auth.model.Category;
import com.endbit.auth.model.Product;
import com.endbit.auth.repository.CategoryRepository;
import com.endbit.auth.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product insertNew(Product product) {

        Long categoryId = product.getCategory().getId();

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        product.setCategory(category);

        return productRepository.save(product);
    }

    public Product update(Long id, Product productInserido) {

        Product productAtual = findById(id);

        if (productAtual == null) {
            return null;
        }

        productAtual.setNome(productInserido.getNome());
        productAtual.setDescricao(productInserido.getDescricao());
        productAtual.setPreco(productInserido.getPreco());
        productAtual.setEstoque(productInserido.getEstoque());

        if (productInserido.getCategory() != null) {

            Category category = categoryRepository
                    .findById(productInserido.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

            productAtual.setCategory(category);
        }

        return productRepository.save(productAtual);
    }

    public boolean deleteById(Long id) {

        Product product = findById(id);

        if (product == null) {
            return false;
        }

        productRepository.delete(product);
        return true;
    }
}