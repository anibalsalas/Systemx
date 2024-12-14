package com.gestion.productos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.productos.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
