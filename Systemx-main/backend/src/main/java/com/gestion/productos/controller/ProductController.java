package com.gestion.productos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.productos.model.Product;
import com.gestion.productos.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

   // Método para actualizar un producto
   @PutMapping("/{id}")
   public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
       Product updatedProduct = productService.updateProduct(id, productDetails);
       
       if (updatedProduct != null) {
           return ResponseEntity.ok(updatedProduct);  // Si el producto se actualiza, se retorna el producto actualizado
       } else {
           return ResponseEntity.notFound().build();  // Si no se encuentra el producto, se retorna 404
       }
   }
   

   // Método para eliminar un producto
   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
       boolean deleted = productService.deleteProduct(id);
       
       if (deleted) {
           return ResponseEntity.noContent().build();
       } else {
           return ResponseEntity.notFound().build();
       }
   }
}

