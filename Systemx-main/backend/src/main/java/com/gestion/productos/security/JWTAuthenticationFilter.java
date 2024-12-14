package com.gestion.productos.security;

import java.io.IOException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTAuthenticationFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        // Revisa si el token JWT está presente en la cabecera Authorization
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Elimina el prefijo "Bearer "
            String username = jwtUtil.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Si el token es válido, se establece la autenticación
                if (jwtUtil.validateToken(token, username)) {
                    // Aquí puedes establecer la autenticación en el contexto de seguridad si es necesario
                    // Por ejemplo:
                    // UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
                    // SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        // Continúa con la cadena de filtros
        chain.doFilter(request, response);
    }
}

