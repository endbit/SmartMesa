package com.endbit.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endbit.auth.model.Category;
import com.endbit.auth.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category insertNew(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category categoryInserida) {
        Category categoryAtual = findById(id);
        if (categoryAtual == null) {
            return null;
        }
        categoryAtual.setNome(categoryInserida.getNome());
        categoryAtual.setDescricao(categoryInserida.getDescricao());
        return categoryRepository.save(categoryAtual);
    }

    public Boolean deleteById(Long id) {
        Category category = findById(id);
        if (category != null) {
            categoryRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }

}
