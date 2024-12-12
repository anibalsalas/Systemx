package com.gestion.productos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.productos.DTO.UserRequest;
import com.gestion.productos.model.Role;
import com.gestion.productos.model.Usuarios;
import com.gestion.productos.repository.RoleRepository;
import com.gestion.productos.service.UserService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    private final PasswordEncoder passwordEncoder;

    
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Usuarios> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // @PostMapping
    // public Usuarios createUser(@RequestBody Usuarios user) {
    //     return userService.createUser(user);
    // }
      
    public UserController(PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

//     @PostMapping
// public ResponseEntity<Usuarios> createUser(@RequestBody UserRequest userRequest) {
//     System.out.println("Request recibido: " + userRequest);
//     System.out.println("Recibido roleId: " + userRequest.getRole());

//     // Verificar si se ha enviado un rol
//     if (userRequest.getRole() == null) {
//         throw new IllegalArgumentException("Debe incluir un rol.");
//     }

//     // Crear el usuario
//     Usuarios user = new Usuarios();
//     user.setUsername(userRequest.getUsername());
//     user.setPassword(passwordEncoder.encode(userRequest.getPassword())); // Encriptar contraseña
//     user.setEmail(userRequest.getEmail());


//     // Buscar el rol en la base de datos por su ID
//     Role role = roleRepository.findById(userRequest.getRole())
//             .orElseThrow(() -> new RuntimeException("Role not found with id: " + userRequest.getRole()));
//     user.setRole(role);  // Asignar el rol al usuario

//     // Crear el usuario
//     Usuarios createdUser = userService.createUser(user);
//     return ResponseEntity.ok(createdUser);
// }


@PostMapping
public ResponseEntity<Usuarios> createUser (@RequestBody UserRequest userRequest) {
    System.out.println("Request recibido: " + userRequest);
    System.out.println("Recibido roleId: " + userRequest.getRole());

    // Verificar si se ha enviado un rol
    if (userRequest.getRole() == null || userRequest.getRole() <= 0) {
        throw new IllegalArgumentException("Debe incluir un rol válido.");
    }

    // Crear el usuario
    Usuarios user = new Usuarios();
    user.setUsername(userRequest.getUsername());
    user.setPassword(passwordEncoder.encode(userRequest.getPassword())); // Encriptar contraseña
    user.setEmail(userRequest.getEmail());

    // Buscar el rol en la base de datos por su ID
    Role role = roleRepository.findById(userRequest.getRole())
            .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado con ID: " + userRequest.getRole()));
    user.setRole(role);  // Asignar el rol al usuario

    // Crear el usuario
    Usuarios createdUser  = userService.createUser (user);
    return ResponseEntity.ok(createdUser );
}

    @PutMapping("/{id}")
    public ResponseEntity<Usuarios> updateUser(@PathVariable Long id, @RequestBody Usuarios userDetails) {
        Usuarios updatedUser = userService.updateUser(id, userDetails);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    
}
