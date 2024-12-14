package com.gestion.productos.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestion.productos.model.Usuarios;

public interface UserRepository extends JpaRepository<Usuarios, Long> {
    Optional<Usuarios> findByUsername(String username);

    @Query("SELECT u FROM Usuarios u ORDER BY u.id ASC") // Cambia 'u.id' por el campo que desees usar para ordenar
    List<Usuarios> findAllOrderByIdAsc();
}