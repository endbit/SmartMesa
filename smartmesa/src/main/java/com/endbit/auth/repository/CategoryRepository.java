package com.endbit.auth.repository;

import org.springframework.stereotype.Repository;

import com.endbit.auth.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
