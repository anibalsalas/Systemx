package com.gestion.productos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gestion.productos.model.Usuarios;
import com.gestion.productos.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;



    
    public List<Usuarios> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<Usuarios> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // public Usuarios createUser(Usuarios user) {
    //     return userRepository.save(user);
    // }
    public Usuarios createUser(Usuarios user) {
        // Validación y creación del usuario
        return userRepository.save(user);  // Guarda el usuario con el rol asignado
    }
    

    public Usuarios updateUser(Long id, Usuarios userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        }).orElse(null);
    }

    public boolean deleteUser(Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscar al usuario por nombre de usuario
        Optional<Usuarios> userOptional = userRepository.findByUsername(username);
        
        // Si no se encuentra el usuario, lanzar excepción
        Usuarios user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        // Convertir el usuario a un objeto UserDetails de Spring Security
        return new User(
            user.getUsername(), 
            user.getPassword(), 
            List.of(new SimpleGrantedAuthority(user.getRole().getName()))  // Añadimos el rol directamente

        );
    }

}
